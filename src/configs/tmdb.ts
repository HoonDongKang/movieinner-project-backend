import dotenv from 'dotenv'
dotenv.config()

export default{
    TMDB_API_KEY:process.env.TMDB_API_KEY,
    TMDB_IMAGE_URL:process.env.TMDB_IMAGE_URL
}