import { Response, Request } from 'express'

const uploadImage = async (req: Request, res: Response) => {
    const imageURL = (req.file as Express.MulterS3.File).location
    if (imageURL) {
        res.status(200)
        res.json({
            success: true,
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
