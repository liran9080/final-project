import AppError from '../errors/appError.js';
import models from '../models/index.js'
import messageMapping from '../config/messageMapping.json' with {type: 'json'}
import foundationService from './foundation.service.js'
import benefitService from './benefits.service.js'
import userModel from '../models/user.model.js';
import userrequestModel from '../models/userrequest.model.js';

const { UserRequest, User, Benefit, Foundation } = models
const validStatus = ["pending", "done"]

const getUserRequest = async (userRequestId) => {

    const userRequest = await UserRequest.findByPk(userRequestId);
    if (!userRequest) {
        throw new AppError(messageMapping.userRequest.not_found, 404)
    }
    
    return userRequest;
}


const getUserRequestsByUserId = async (userId) => {
    const userRequests = await UserRequest.findAll({ 
        raw: true, 
        where: { userId: userId},
        include:[
            {model: User, as: 'requestUser'},
            {model: Benefit, as: 'requestBenefit'},
            {model: Foundation, as:'userRequestFoundation'}
        ]
    } )
    return userRequests;
}

const addUserRequest = async (userRequest) => {

    // מוודאים שהעמותה קיימת
    const foundation = await foundationService.getFoundation(userRequest.foundationId)

    if (!foundation) {
        throw new AppError(`${messageMapping.userRequest.foundation_not_found} ${userRequest.foundationId}`, 400)
    }

    // מוודאים שהזכות קיימת
    const benefit = await benefitService.getBenefit(userRequest.benefitId)

    if (!benefit) {
        throw new AppError(`${messageMapping.userRequest.benefit_not_found} ${userRequest.benefitId}`, 400)
    }    
    userRequest.createdDate = undefined
    const createdRequest = await UserRequest.create(userRequest)

    return createdRequest;
}

const updateUserRequestStatus = async (userRequestId, status) => {

    if(!validStatus.includes(status)){
        throw new AppError(messageMapping.userRequest.invalid_status, 400)
    }
    // מוודאים שהמשתמש קיים
    const existingUserRequest = await UserRequest.findByPk(userRequestId)

    if (!existingUserRequest) {
        throw new AppError(messageMapping.userRequest.not_found, 404)
    }
    
    existingUserRequest.status = status;

    const updatedUserRequest = await existingUserRequest.save()
    return updatedUserRequest;
}

const getRequestsByFoundation = async(foundationId) => {
    const userRequests = await UserRequest.findAll({ 
        aw: true, 
        where: { foundationId: foundationId},
        include:[{model: User, as: 'requestUser'},{model: Benefit, as: 'requestBenefit'}] 
    })
    return userRequests;
}
export default {getUserRequest, getRequestsByFoundation, getUserRequestsByUserId, addUserRequest, updateUserRequestStatus}