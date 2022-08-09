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
    getUserInfo: {
        urlPath: '/users',
        method: 'get',
        handlerName: 'getUserInfo',
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
        urlPath: '/users/verify',
        method: 'post',
        handlerName: 'emailVerifyLink',
        handlerPath: './src/apis/emailVerify.ts',
    },
    checkEmailLink: {
        urlPath: '/users/verify/:inserId',
        method: 'get',
        handlerName: 'checkEmailLink',
        handlerPath: './src/apis/emailVerify.ts',
    },
}
