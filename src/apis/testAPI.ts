import express from 'express'
import { connect } from '../modules/connect'
export const router = express.Router()

router.get('/', async (req, res) => {
    const response = await connect(`SELECT * FROM user_info`, [])
    console.log(response)
    res.json({
        connection: response,
        message: 'Connection Success',
    })
})
