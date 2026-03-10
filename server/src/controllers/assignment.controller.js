
import assignmentService from '../services/assignment.service.js'
import messageMapping from '../config/messageMapping.json' with {type: 'json'}
import AppError from '../errors/appError.js'

//export default {addAssignment, getAssignmentsByProfessionalId, getAssignmentssByUserId}

const addAssignment = async (req, res) => {
    const assignment = req.body
    try {
        if (!assignment) {
            res.status(400).send({ message: messageMapping.comment.comment_not_sent })
            return;
        }
        if (req.user.userId != assignment.professionalId) {
            res.status(400).send({ message: messageMapping.comment.invalid_userId })
            return;
        }
        const createdAssignment = await assignmentService.addAssignment(assignment)
        res.status(201).send(createdAssignment)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}

const getAssignmentssByUserId = async (req, res) => {
    const { userId } = req.params;
    
    try {
        if (!userId) {
            throw new AppError(messageMapping.comment.invalid_userId, 404)
        }
        const assignments = await assignmentService.getAssignmentsByUserId(userId)
        
        res.send(assignments)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}

const getAssignmentsByProfessionalId = async (req, res) => {
    const { professionalId } = req.params;
    
    try {
        if (!professionalId) {
            throw new AppError(messageMapping.comment.invalid_userId, 404)
        }
        const assignments = await assignmentService.getAssignmentsByProfessionalId(professionalId)
        
        res.send(assignments)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}



export default { addAssignment, getAssignmentsByProfessionalId, getAssignmentssByUserId }