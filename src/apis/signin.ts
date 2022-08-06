import express from 'express'

export const signInRouter = express.Router()

signInRouter.get('/', async (req, res) => {
    res.json({
        connection: true,
        message: 'Connection Success',
    })
})
