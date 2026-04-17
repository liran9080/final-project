import express from 'express'
import professionalFoundationController from '../controllers/professionalFoundation.controller.js'
//import tokenService from '../middleware/token.service.js'

const professionalFoundationRouter = express.Router()


professionalFoundationRouter.get('/professionals/:professionalId', professionalFoundationController.getByProfessionalId)
professionalFoundationRouter.get('/foundations/:foundationId', professionalFoundationController.getProfessionalListByFoundationId)


export default professionalFoundationRouter;