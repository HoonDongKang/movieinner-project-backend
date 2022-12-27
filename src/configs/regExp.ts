//닉네임 유효성 검사 영어 대소문, 한글, 숫자, 특수기호(-,_,.) 2~12글자
export const IsValidateName = (str: string) => {
    return /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/.test(str)
}
