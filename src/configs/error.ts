interface ErrorConfigsType {
    [key: string]: { code: string; message: string; status: number }
}

const errorConfigs = {
    E0000: {
        code: 'E0000',
        message: '이미 존재하는 이메일입니다.',
        status: 403,
    },
    E0001: {
        code: 'E0001',
        message: '요청 파라미터가 잘못되었습니다.',
        status: 400,
    },
    E0002: {
        code: 'E0002',
        message: '이메일 인증 코드가 잘못되었습니다.',
        status: 403,
    },
}
