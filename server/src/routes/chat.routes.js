import express from 'express'
import chatController from '../controllers/chat.controller.js'
import tokenService from '../middleware/token.service.js'
const chatRouter = express.Router()
// path prefix http://127.0.0.1/api/chats == /

chatRouter.get('', tokenService.verifyToken, chatController.getChatByParticipants);
chatRouter.post('',tokenService.verifyToken, chatController.addMessage)

export default chatRouter;