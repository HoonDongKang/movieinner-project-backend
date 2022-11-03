export const changeDbTimeForm = (array: any[]) => {
    for (let i = 0; i < array.length; i++) {
        const timeStamp = new Date(
            array[i].created_at - new Date().getTimezoneOffset() * 120000 //한국 시간
        )
        const date = timeStamp.toISOString().substring(0, 10)
        array[i].created_at = date
    }
}
