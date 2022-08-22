interface ErrorConfigsType {
    [key: string]: { code: string; message: string; status: number }
}

const errorConfigs: ErrorConfigsType = {
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
    E0003: {
        code: 'E0003',
        message: '비밀번호가 잘못되었습니다.',
        status: 403,
    },
    E0004: {
        code: 'E0004',
        message: '원인을 알 수 없는 에러.',
        status: 500,
    },
    E0005: {
        code: 'E0005',
        message: '권한이 올바르지 않습니다.',
        status: 500,
    },
    E0006: {
        code: 'E0006',
        message: '이메일이 존재하지 않습니다.',
        status: 403,
    },
}

export default errorConfigs
