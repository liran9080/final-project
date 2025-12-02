import express from 'express'
import controller from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/login', controller.login)

authRouter.post('/register', controller.register)

export default authRouter;