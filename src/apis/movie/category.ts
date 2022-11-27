//카테고리별 영화 만들기
import { DbConnection } from './../../modules/connect'

const searchCategory = async (params: any, connection: DbConnection) => {
    const { search, searchPage } = params //query
    try {
    } catch (e: any) {
        console.error(e)
    }
}

export default {
    searchCategory,
}
