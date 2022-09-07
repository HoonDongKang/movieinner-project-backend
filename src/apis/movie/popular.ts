import { DbConnection } from "../../modules/connect";
import axios from 'axios'
import TMDB from '../../configs/tmdb'

const {TMDB_API_KEY,TMDB_IMAGE_URL}=TMDB

const getPopularMovies=async(params:any,connection:DbConnection)=>{
    try{
        //popular movie page
    } catch(e:any){
        throw new Error(e)
    }
}