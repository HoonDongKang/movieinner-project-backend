import express from 'express'
import { upload, deleteImage } from '../modules/multer'
import uploadImage from '../controllers/image'
const router = express.Router()
router.post('/', upload.single('image'), uploadImage)
router.delete('/', deleteImage)

export default router
