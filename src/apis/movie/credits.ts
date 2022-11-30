import axios from 'axios'
import TMDB from '../../configs/tmdb'
import { paramsErrorHandler } from './../../modules/paramsError'

interface MovieCreditsArrayType{
    gender:number,
    name:string,
    profile_path:string,
    character:string,
    known_for_department:string
}

const { TMDB_API_KEY } = TMDB

const getCredits = async (params: { movieId: string }, conncetion: never) => {
    const { movieId } = params
    const movieCredits: Array<MovieCreditsArrayType> = []
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&language=ko`
        )
        //7명까지만
        for (let i = 0; i < 7; i++) {
            movieCredits.push({
                gender: response.data.cast[i].gender,
                name: response.data.cast[i].name,
                profile_path: response.data.cast[i].profile_path,
                character: response.data.cast[i].character,
                known_for_department:
                    response.data.cast[i].known_for_department,
            })
        }
        return {
            status: 201,
            data: movieCredits,
        }
    } catch (e: any) {
        paramsErrorHandler(e)
    }
}

export default {
    getCredits,
}
