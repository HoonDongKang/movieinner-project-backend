import express from 'express'
import cors from 'cors'
import { useMysql } from './src/middlewares/dbConnect'
import { registerAllApis } from './src/controllers'
import { apiConfigs } from './src/configs/api'
import router from './src/apis/image'

const app = express()
const PORT = 3714

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(useMysql)
app.use('/image', router)
registerAllApis(app, apiConfigs)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
