import express from 'express'
import controller from '../controllers/user.controller.js'
import tokenService from '../middleware/token.service.js'

const userRouter = express.Router()

// http://127.0.0.1/api/users
userRouter.get('', tokenService.verifyAdmin, controller.getUsers)

// http://127.0.0.1/api/users/12
userRouter.get('/:userId', controller.getUser)

// http://127.0.0.1/api/users/12
userRouter.put('/:userId', controller.updateUser)

// http://127.0.0.1/api/users/password/12
userRouter.patch('/password/:userId', controller.updatePassword)

// http://127.0.0.1/api/users/123
userRouter.delete('/:userId', tokenService.verifyAdmin, controller.disableUser);
userRouter.patch('/enable/:userId', tokenService.verifyAdmin, controller.enableUser);


export default userRouter;