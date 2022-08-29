interface ApiConfigType {
    urlPath: string
    method: 'get' | 'post' | 'put' | 'delete'
    handlerName: string
    handlerPath: string
}

export type ApiConfigObj = {
    [key: string]: ApiConfigType
}

export const apiConfigs: ApiConfigObj = {
    testAPI: {
        urlPath: '/',
        method: 'get',
        handlerName: 'testAPI',
        handlerPath: './src/apis/testAPI.ts',
    },
    getUsers: {
        urlPath: '/users',
        method: 'get',
        handlerName: 'getUsers',
        handlerPath: './src/apis/users/user.ts',
    },
    getIdxUser: {
        urlPath: '/users/:insertId',
        method: 'get',
        handlerName: 'getIdxUser',
        handlerPath: './src/apis/users/user.ts',
    },
    deleteUsers: {
        urlPath: '/users',
        method: 'delete',
        handlerName: 'deleteUsers',
        handlerPath: './src/apis/users/user.ts',
    },
    deleteIdxUser: {
        urlPath: '/users/:insertId',
        method: 'delete',
        handlerName: 'deleteIdxUser',
        handlerPath: './src/apis/users/user.ts',
    },
    changeUserPassword: {
        urlPath: '/users/password',
        method: 'put',
        handlerName: 'changeUserPassword',
        handlerPath: './src/apis/users/user.ts',
    },
    checkUserEmail: {
        urlPath: '/users/email',
        method: 'post',
        handlerName: 'checkUserEmail',
        handlerPath: './src/apis/users/user.ts',
    },
    checkUserNickname: {
        urlPath: '/users/nickname',
        method: 'post',
        handlerName: 'checkUserNickname',
        handlerPath: './src/apis/users/user.ts',
    },
    signin: {
        urlPath: '/users/:insertId',
        method: 'post',
        handlerName: 'signin',
        handlerPath: './src/apis/users/signin.ts',
    },
    signup: {
        urlPath: '/users',
        method: 'post',
        handlerName: 'signup',
        handlerPath: './src/apis/users/signup.ts',
    },
    emailVerifyLink: {
        urlPath: '/verify',
        method: 'post',
        handlerName: 'emailVerifyLink',
        handlerPath: './src/apis/verify/emailVerify.ts',
    },
    checkEmailLink: {
        urlPath: '/verify',
        method: 'get',
        handlerName: 'checkEmailLink',
        handlerPath: './src/apis/verify/emailVerify.ts',
    },
    pwResetEmailLink: {
        urlPath: '/verify/password',
        method: 'post',
        handlerName: 'pwResetEmailLink',
        handlerPath: './src/apis/verify/pwVerify.ts',
    },
    checkPwResetEmailLink: {
        urlPath: '/verify/password',
        method: 'get',
        handlerName: 'checkPwResetEmailLink',
        handlerPath: './src/apis/verify/pwVerify.ts',
    },
    postAuth: {
        urlPath: '/auth',
        method: 'post',
        handlerName: 'postAuth',
        handlerPath: './src/apis/auth/token.ts',
    },
    getUserInfoKakao: {
        urlPath: '/auth/kakao',
        method: 'post',
        handlerName: 'getUserInfoKakao',
        handlerPath: './src/apis/auth/kakao.ts',
    },
    getUserInfoGoogle: {
        urlPath: '/auth/google',
        method: 'post',
        handlerName: 'getUserInfoGoogle',
        handlerPath: './src/apis/auth/google.ts',
    },
    getUserInfoNaver: {
        urlPath: '/auth/google',
        method: 'post',
        handlerName: 'getUserInfoNaver',
        handlerPath: './src/apis/auth/naver.ts',
    },
}
