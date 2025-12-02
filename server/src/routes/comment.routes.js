import express from 'express'
import commentController from '../controllers/comment.controller.js'
import tokenService from '../middleware/token.service.js'
const commentRouter = express.Router()

commentRouter.get('/foundations/:foundationId', commentController.getCommentsByFoundation)

commentRouter.get('/:commentId', commentController.getComment)
commentRouter.post('',tokenService.verifyToken, commentController.addComment)
commentRouter.put('/:commentId', tokenService.verifyToken, commentController.updateComment)
commentRouter.delete('/:commentId',tokenService.verifyToken, commentController.deleteComment)
export default commentRouter;