import express from 'express'
import cors from 'cors'
import { router } from './src/apis/testAPI'
import { signUpRouter } from './src/apis/signup'
import { signInRouter } from './src/apis/signin'

const app = express()
const PORT = 3714

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.use('/', router)
app.use('/signup', signUpRouter)
app.use('/signin', signInRouter)

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
