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
