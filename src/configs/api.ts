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
        handlerPath: './src/apis/user.ts',
    },
    getIdxUser: {
        urlPath: '/users/:insertId',
        method: 'get',
        handlerName: 'getIdxUser',
        handlerPath: './src/apis/user.ts',
    },
    deleteUsers: {
        urlPath: '/users',
        method: 'delete',
        handlerName: 'deleteUsers',
        handlerPath: './src/apis/user.ts',
    },
    deleteIdxUser: {
        urlPath: '/users/:insertId',
        method: 'delete',
        handlerName: 'deleteIdxUser',
        handlerPath: './src/apis/user.ts',
    },
    changeUserPassword: {
        urlPath: '/users/password',
        method: 'put',
        handlerName: 'changeUserPassword',
        handlerPath: './src/apis/user.ts',
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
