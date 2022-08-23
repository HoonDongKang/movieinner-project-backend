import express from 'express'
import { upload } from '../modules/multer'
import { uploadImage, deleteImage } from '../controllers/image'
const router = express.Router()

router.post('/', upload.single('image'), uploadImage)

router.delete('/', deleteImage)

export default router
