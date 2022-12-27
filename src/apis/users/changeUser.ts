// 유저 정보 CRUD API
import { IsValidateName } from "../../configs/regExp";
import { DbConnection } from "../../modules/connect";
import { paramsErrorHandler } from "../../modules/paramsError";

//특정 유저 비밀번호 변경
const changeUserPassword = async (
  params: { email: string; newPassword: string },
  connection: DbConnection
) => {
  try {
    const { email, newPassword } = params;
    await connection.run(`UPDATE user_info SET password=? WHERE email=?`, [
      newPassword,
      email,
    ]);
  } catch (e: any) {
    paramsErrorHandler(e);
  }
  return { status: 200, data: { success: true } };
};

const changeUserNickname = async (
  params: { nickname: string; email: string; newNickname: string },
  connection: DbConnection
) => {
  //닉네임 유효성 검사 이후
  const { nickname, email, newNickname } = params;
  try {
    const IsValid = IsValidateName(newNickname);
    console.log(IsValid)
    if (IsValid) {
        console.log(IsValid)
      const selectRes = await connection.run(
        `SELECT COUNT(*) as count FROM user_info WHERE email=? AND nickname=?`,
        [email, nickname]
      );
      const { count } = selectRes[0];
      //이거 쿼리 하나로 끝내보기
      if (count > 0) {
        await connection.run(
          `UPDATE user_info SET user_info.nickname=? WHERE user_info.nickname=?`,
          [newNickname, nickname]
        );
        await connection.run(
          `UPDATE liked SET liked.nickname=? WHERE liked.nickname=?`,
          [newNickname, nickname]
        );
        await connection.run(
          `UPDATE community SET community.nickname=? WHERE community.nickname=?`,
          [newNickname, nickname]
        );
        await connection.run(
          `UPDATE comments SET comments.nickname=? WHERE comments.nickname=?`,
          [newNickname, nickname]
        );
      } else {
        throw "E0008";
      }
      return {
        status: 201,
        data: {
          success: true,
        },
      };
    } else {
      return {
        status: 400,
        data: {
          success: false,
        },
      };
    }
  } catch (e: any) {
    paramsErrorHandler(e);
  }
};

export default {
  changeUserPassword,
  changeUserNickname,
};
