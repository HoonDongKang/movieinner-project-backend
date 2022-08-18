import { DbConnection } from '../modules/connect'
import express from 'express'
import upload from '../modules/multer'
const router = express.Router()
router.post('/', upload.single('file'), (req, res) => {
    console.log(res)
})

export default router
