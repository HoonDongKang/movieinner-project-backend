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
        urlPath: '/signin',
        method: 'get',
        handlerName: 'getUserInfo',
        handlerPath: './src/apis/signin.ts',
    },
    signup: {
        urlPath: '/signup',
        method: 'post',
        handlerName: 'signup',
        handlerPath: './src/apis/signup.ts',
    },
    emailVerifyLink: {
        urlPath: '/email-verify',
        method: 'post',
        handlerName: 'emailVerifyLink',
        handlerPath: './src/apis/emailVerify.ts',
    },
}
