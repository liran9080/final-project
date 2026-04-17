
import professionalFoundationService from '../services/professionalFoundation.service.js'
import messageMapping from '../config/messageMapping.json' with {type: 'json'}


const getByProfessionalId = async (req, res) => {
    const {professionalId} = req.params
    try {
        if (!professionalId) {
            res.status(400).send({ message: messageMapping.professionlFoundation.missingProfessional })
            return;
        }
        
        const professionalFoundation = await professionalFoundationService.getByProfessionalId(professionalId)
        res.status(201).send(professionalFoundation)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}
const getProfessionalListByFoundationId = async (req, res) => {
    const {foundationId} = req.params
    try {
        if (!foundationId) {
            res.status(400).send({ message: messageMapping.professionlFoundation.missingFoundation })
            return;
        }
        
        const professionalList = await professionalFoundationService
            .getProfessionalListByFoundationId(foundationId)
        res.status(201).send(professionalList)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}



export default { getByProfessionalId, getProfessionalListByFoundationId }