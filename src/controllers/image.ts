import { Response, Request } from "express"
import dotenv from "dotenv"
import s3AccessKey from "../configs/s3"
import aws, { AWSError } from "aws-sdk"
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
    const imageArray = imageName.split("/")
    const imageKey = imageArray[3]
    const params = {
        Bucket: "movie-inner",
        Key: imageKey,
    }
    console.log(imageKey)
    try {
        await s3.deleteObject(params, function (err: AWSError, data: any) {
            //data의 값을 못받아옴
            if (err) {
                res.status(400)
                res.json({
                    success: false,
                    error: err,
                })
            } else {
                res.status(201)
                res.json({
                    success: true,
                    deleted: imageKey,
                })
            }
        })
    } catch (e) {
        console.error(e)
        res.status(400)
        res.json({
            success: false,
            error: e,
        })
    }
}
