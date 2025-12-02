import express from "express";
import tokenService from '../middleware/token.service.js'
import controller from '../controllers/benefits.controller.js'

const benefitRoutes = express.Router();

benefitRoutes.get('', controller.getBenefits)
benefitRoutes.get('/:benefitId', controller.getBenefit)
benefitRoutes.post('', tokenService.verifyToken, tokenService.verifyAdmin, controller.addBenefit)
benefitRoutes.put('/:benefitId', tokenService.verifyToken, tokenService.verifyAdmin,controller.updateBenefit)

export default benefitRoutes;