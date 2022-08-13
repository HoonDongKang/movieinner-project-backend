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
    getUsersInfo: {
        urlPath: '/users',
        method: 'get',
        handlerName: 'getUsersInfo',
        handlerPath: './src/apis/signin.ts',
    },
    getIdxUserInfo: {
        urlPath: '/users/:insertId',
        method: 'get',
        handlerName: 'getIdxUserInfo',
        handlerPath: './src/apis/signin.ts',
    },
    signin: {
        urlPath: '/users/:insertId',
        method: 'post',
        handlerName: 'signIn',
        handlerPath: './src/apis/signin.ts',
    },
    signup: {
        urlPath: '/users',
        method: 'post',
        handlerName: 'signup',
        handlerPath: './src/apis/signup.ts',
    },
    emailVerifyLink: {
        urlPath: '/verify',
        method: 'post',
        handlerName: 'emailVerifyLink',
        handlerPath: './src/apis/emailVerify.ts',
    },
    checkEmailLink: {
        urlPath: '/verify',
        method: 'get',
        handlerName: 'checkEmailLink',
        handlerPath: './src/apis/emailVerify.ts',
    },
}
