import express from 'express'
import service from '../services/user.service.js'
import tokenService from '../middleware/token.service.js'

const userRouter = express.Router()

userRouter.get('', tokenService.verifyAdmin, service.getUsers)

userRouter.get('/:userId', service.getUser)

userRouter.put('', service.updateUser)
export default userRouter;