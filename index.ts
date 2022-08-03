import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3714

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})
