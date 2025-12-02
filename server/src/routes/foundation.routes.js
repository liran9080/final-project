import express from 'express'
import controller from '../controllers/foundation.controller.js'
import tokenService from '../middleware/token.service.js'
const foundationRouter = express.Router()

// http://127.0.0.1:5566/api/foundations  /1

// כתבתי כאן את הקוד שצריך להיות בסרביס לטובת אימון
foundationRouter.get('/categories/:categoryId', controller.getFoundationsByCategory)

foundationRouter.get('/areas', controller.getAreas)
foundationRouter.get('/:foundationId', controller.getFoundation)

foundationRouter.post('', tokenService.verifyToken, tokenService.verifyAdmin, controller.addFoundation)
foundationRouter.put('/:foundationId',tokenService.verifyToken, tokenService.verifyAdmin, controller.updateFoundation)
foundationRouter.delete('/:foundationId', tokenService.verifyToken, tokenService.verifyAdmin, controller.deleteFoundation)
export default foundationRouter;