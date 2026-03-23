import express from 'express'
import userRequestController from '../controllers/userRequest.controller.js'
import tokenService from '../middleware/token.service.js'
const assignmentRouter = express.Router()
// path prefix http://127.0.0.1/api/userrequests == /

//http://127.0.0.1/api/userrequests/12 == /12
assignmentRouter.get('/foundations/:foundationId', tokenService.verifyToken, userRequestController.getRequestsByFoundation)
assignmentRouter.get(':userRequestId',tokenService.verifyToken, userRequestController.getUserRequest)
assignmentRouter.get('users/:userId', tokenService.verifyToken, userRequestController.getUserRequestsByUserId)
assignmentRouter.post('',tokenService.verifyToken, userRequestController.addUserRequest);
assignmentRouter.put('',tokenService.verifyToken, userRequestController.updateUserRequestStatus);

export default assignmentRouter;