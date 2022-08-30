import express from 'express'
import cors from 'cors'
import { useMysql } from './src/middlewares/dbConnect'
import { registerAllApis } from './src/controllers'
import { apiConfigs } from './src/configs/api'
import router from './src/apis/image'
import { errorHandler } from './src/middlewares/errorHandler'
import cookieParser from 'cookie-parser'
import authRouter from './src/apis/tokenTest'

const app = express()
const PORT = 3714

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ credentials: true, origin: true }))
app.use(useMysql)
app.use(cookieParser())

app.use('/image', router)
app.use('/auth', authRouter)
registerAllApis(app, apiConfigs)
    .then(() => {
        app.use(errorHandler)
        app.listen(PORT, () => {
            console.log(`Example app listening at http://localhost:${PORT}`)
        })
    })
    .catch((e) => {
        console.error(e)
        process.exit(-1)
    })
