import { DbConnection } from '../modules/connect'
import express,{Request} from 'express'
import upload from '../modules/multer'
const router = express.Router()
router.post('/', upload.single('image'), (req:Request, res) => {
    console.log(req.file)
})

export default router
