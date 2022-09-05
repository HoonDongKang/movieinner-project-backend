interface ApiConfigType {
    urlPath: string
    method: 'get' | 'post' | 'put' | 'delete'
    handlerName: string
    handlerPath: string
    authorizer: boolean
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
        authorizer: false,
    },
    authTestAPI: {
        urlPath: '/authtest',
        method: 'get',
        handlerName: 'authTestAPI',
        handlerPath: './src/apis/testAPI.ts',
        authorizer: true,
    },
    getUsers: {
        urlPath: '/users',
        method: 'get',
        handlerName: 'getUsers',
        handlerPath: './src/apis/users/user.ts',
        authorizer: false,
    },
    getIdxUser: {
        urlPath: '/users/:insertId',
        method: 'get',
        handlerName: 'getIdxUser',
        handlerPath: './src/apis/users/user.ts',
        authorizer: false,
    },
    deleteUsers: {
        urlPath: '/users',
        method: 'delete',
        handlerName: 'deleteUsers',
        handlerPath: './src/apis/users/user.ts',
        authorizer: false,
    },
    deleteIdxUser: {
        urlPath: '/users/:insertId',
        method: 'delete',
        handlerName: 'deleteIdxUser',
        handlerPath: './src/apis/users/user.ts',
        authorizer: false,
    },
    changeUserPassword: {
        urlPath: '/users/password',
        method: 'put',
        handlerName: 'changeUserPassword',
        handlerPath: './src/apis/users/user.ts',
        authorizer: false,
    },
    checkUserEmail: {
        urlPath: '/users/email',
        method: 'post',
        handlerName: 'checkUserEmail',
        handlerPath: './src/apis/users/user.ts',
        authorizer: false,
    },
    checkUserNickname: {
        urlPath: '/users/nickname',
        method: 'post',
        handlerName: 'checkUserNickname',
        handlerPath: './src/apis/users/user.ts',
        authorizer: false,
    },
    signin: {
        urlPath: '/users/login',
        method: 'post',
        handlerName: 'signin',
        handlerPath: './src/apis/users/signin.ts',
        authorizer: false,
    },
    signup: {
        urlPath: '/users',
        method: 'post',
        handlerName: 'signup',
        handlerPath: './src/apis/users/signup.ts',
        authorizer: false,
    },
    logout: {
        urlPath: '/users/logout',
        method: 'post',
        handlerName: 'logout',
        handlerPath: './src/apis/users/logout.ts',
        authorizer: false,
    },
    emailVerifyLink: {
        urlPath: '/verify',
        method: 'post',
        handlerName: 'emailVerifyLink',
        handlerPath: './src/apis/verify/emailVerify.ts',
        authorizer: false,
    },
    checkEmailLink: {
        urlPath: '/verify',
        method: 'get',
        handlerName: 'checkEmailLink',
        handlerPath: './src/apis/verify/emailVerify.ts',
        authorizer: false,
    },
    pwResetEmailLink: {
        urlPath: '/verify/password',
        method: 'post',
        handlerName: 'pwResetEmailLink',
        handlerPath: './src/apis/verify/pwVerify.ts',
        authorizer: false,
    },
    checkPwResetEmailLink: {
        urlPath: '/verify/password',
        method: 'get',
        handlerName: 'checkPwResetEmailLink',
        handlerPath: './src/apis/verify/pwVerify.ts',
        authorizer: false,
    },
    generateToken: {
        urlPath: '/auth',
        method: 'post',
        handlerName: 'generateToken',
        handlerPath: './src/apis/auth/generateToken.ts',
        authorizer: false,
    },
    getCookies: {
        urlPath: '/auth',
        method: 'get',
        handlerName: 'getCookies',
        handlerPath: './src/apis/auth/generateToken.ts',
        authorizer: false,
    },
    getPayloadToken: {
        urlPath: '/auth/verify',
        method: 'post',
        handlerName: 'getPayloadToken',
        handlerPath: './src/apis/auth/verifyToken.ts',
        authorizer: false,
    },
    refreshToken: {
        urlPath: '/auth/refresh',
        method: 'post',
        handlerName: 'refreshToken',
        handlerPath: './src/apis/auth/refreshToken.ts',
        authorizer: false,
    },
    getUserInfoKakao: {
        urlPath: '/auth/kakao',
        method: 'post',
        handlerName: 'getUserInfoKakao',
        handlerPath: './src/apis/auth/kakao.ts',
        authorizer: false,
    },
    getUserInfoGoogle: {
        urlPath: '/auth/google',
        method: 'post',
        handlerName: 'getUserInfoGoogle',
        handlerPath: './src/apis/auth/google.ts',
        authorizer: false,
    },
    getUserInfoNaver: {
        urlPath: '/auth/naver',
        method: 'post',
        handlerName: 'getUserInfoNaver',
        handlerPath: './src/apis/auth/naver.ts',
        authorizer: false,
    },
}
