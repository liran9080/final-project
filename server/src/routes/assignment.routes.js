import express from 'express'
import assignmentController from '../controllers/assignment.controller.js'
import tokenService from '../middleware/token.service.js'
const assignmentRouter = express.Router()
// path prefix http://127.0.0.1/api/assignments == /

//http://127.0.0.1/api/assignments/12 == /12
assignmentRouter.get('professionals/:professionalId', assignmentController.getAssignmentsByProfessionalId)
assignmentRouter.get('users/:userId', assignmentController.getAssignmentssByUserId)
assignmentRouter.post('',tokenService.verifyToken, assignmentController.addAssignment)

export default assignmentRouter;