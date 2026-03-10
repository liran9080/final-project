import models from '../models/index.js'
import userService from './user.service.js'
import messageMapping from '../config/messageMapping.json' with {type: 'json'}
import AppError from '../errors/appError.js'

const { Assignment } = models


const getAssignmentsByUserId = async (userId) => {

    const assignments = await Assignment.findAll({ raw: true, where: { userId: userId } })

    return assignments.sort((c1, c2) => c1.createdDate.toString().localeCompare(c2.createdDate.toString()))
}

const getAssignmentsByProfessionalId = async (professionalId) => {

    const assignments = await Assignment.findAll({ raw: true, where: { professionalId: professionalId } })

    return assignments.sort((c1, c2) => c1.createdDate.toString().localeCompare(c2.createdDate.toString()))
}

const addAssignment = async (assignment) => {

    // מוודאים שהמשתמש קיים
    const user = await userService.getUser(assignment.userId)

    if (!user) {
        throw new AppError(`${messageMapping.comment.foundation_not_found} ${comment.foundationId}`, 400)
    }

    const professional = await userService.getUser(assignment.professionalId)

    if (!professional) {
        throw new AppError(`${messageMapping.comment.foundation_not_found} ${comment.foundationId}`, 400)
    }
    assignment.createdDate = undefined
    assignment.createdTime = undefined
    const createdAssignment = await Assignment.create(assignment)

    return createdAssignment;
}

export default {addAssignment, getAssignmentsByProfessionalId, getAssignmentsByUserId}