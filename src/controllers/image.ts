import { Response, Request } from 'express'
import dotenv from 'dotenv'
import s3AccessKey from '../configs/s3'
import aws from 'aws-sdk'
dotenv.config()

const { AWS_S3_ACCESS_ID, AWS_S3_ACCESS_KEY, AWS_S3_REGION } = s3AccessKey
aws.config.update({
    accessKeyId: AWS_S3_ACCESS_ID,
    secretAccessKey: AWS_S3_ACCESS_KEY,
    region: AWS_S3_REGION,
})
const s3 = new aws.S3() as any

export const uploadImage = async (req: Request, res: Response) => {
    const multerFile = req.file as Express.MulterS3.File
    const imageURL = multerFile.location
    const imageName = multerFile.key
    const imageSize = multerFile.size
    if (imageURL) {
        res.status(200)
        res.json({
            success: true,
            imageName: imageName,
            imageSize: imageSize,
            imageURL: imageURL,
        })
    } else {
        res.status(400)
        res.json({
            success: false,
        })
    }
}

export const deleteImage = async (req: Request, res: Response) => {
    const { imageName } = req.body
    const params = {
        Bucket: 'movie-inner',
        Key: imageName,
    }
    try {
        s3.deleteObject(params, function (err: any, data: any) {
            if (err) console.log(err)
            else console.log(data)
        })
    } catch (e) {
        console.log(e)
    }
}
