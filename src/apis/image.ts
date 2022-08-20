import express from 'express'
import upload from '../modules/multer'
import uploadImage from '../controllers/image'
const router = express.Router()
router.post('/', upload.single('image'), uploadImage)

export default router
