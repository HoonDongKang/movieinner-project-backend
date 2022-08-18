import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import dotenv from 'dotenv'
import s3AccessKey from '../configs/s3'
dotenv.config()
const { AWS_S3_ACCESS_ID, AWS_S3_ACCESS_KEY, AWS_S3_REGION } = s3AccessKey
aws.config.update({
    accessKeyId: AWS_S3_ACCESS_ID,
    secretAccessKey: AWS_S3_ACCESS_KEY,
    region: AWS_S3_REGION,
})

const s3 = new aws.S3() as any
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'movie-inner',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`)
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
})

export default upload
