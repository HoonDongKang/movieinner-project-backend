import { genreId } from '../../modules/tmdbConvert'

const getGenre = async (param: never, connection: never) => {
    return{
        status:200,
        data:genreId
    }
}

export default { getGenre }
