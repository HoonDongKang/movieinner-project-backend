export const IsValidateName = (str: string) => {
    return /^[a-zA-Zㄱ-힣0-9-_.]{2,12}$/.test(str)
}
