import models from '../models/index.js'
import userService from './user.service.js'
import messageMapping from '../config/messageMapping.json' with {type: 'json'}
import AppError from '../errors/appError.js'

const { ProfessionalFoundation, User, Foundation } = models


const getByProfessionalId = async (professionalId) => {

    const professionalFoundation = await ProfessionalFoundation.findOne({ 
        where: { professionalId: professionalId },
        include:[
            {model: User, as: 'user'},
            {model: Foundation, as: 'foundation'},
        ] })

    return professionalFoundation
}

const getProfessionalListByFoundationId = async(foundationId) => {
    const professionalsFoundation = await ProfessionalFoundation.findAll({ 
        raw: true, 
        where: { foundationId: foundationId },
        include:[
            {model: User, as: 'user'},
            {model: Foundation, as: 'foundation'},
        ] })
    return professionalsFoundation;
}


export default {getByProfessionalId, getProfessionalListByFoundationId}