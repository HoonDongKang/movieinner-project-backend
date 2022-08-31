export const paramsErrorHandler = (e: any) => {
    if (
        e.message ===
        'Bind parameters must not contain undefined. To pass SQL NULL specify JS null'
    ) {
        throw new Error('E0001')
    } else {
        throw new Error(e)
    }
}

export const unauthorizedErrorHandler = (e: any) => {
    if (e.message === 'Request failed with status code 401') {
        throw new Error('E0005')
    }
    if (e.message === 'Request failed with status code 400') {
        throw new Error('E0007')
    } else {
        throw new Error(e)
    }
}

export const jwtErrorHandler = (e: any) => {
    if (e.message === 'jwt malformed') {
        throw new Error('E0005')
    } else if (e.message === 'jwt must be provided') {
        throw new Error('E0001')
    } else {
        throw new Error(e)
    }
}
