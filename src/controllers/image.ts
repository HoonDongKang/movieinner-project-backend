import { Response, Request } from 'express'

const uploadImage = async (req: Request, res: Response) => {
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

export default uploadImage
