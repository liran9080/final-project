
import userRequestService from '../services/userRequest.service.js'
import messageMapping from '../config/messageMapping.json' with {type: 'json'}
import AppError from '../errors/appError.js'

const addUserRequest = async (req, res) => {
    const userRequest = req.body
    try {
        if (!userRequest) {
            res.status(400).send({ message: messageMapping.userRequest.invalid_userRequest})
            return;
        }
        if (req.user.userId != userRequest.userId) {
            res.status(403).send({ message: messageMapping.userRequest.invalid_user_id })
            return;
        }
        const createdUserRequest = await userRequestService.addUserRequest(userRequest)
        res.status(201).send(createdUserRequest)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}
const updateUserRequestStatus = async (req, res) => {
    const status = req.body;
    const {userRequestId} = req.params;
    try {
        if (!userRequestId) {
            res.status(400).send({ message: messageMapping.userRequest.invalid_request_id})
            return;
        }
        
        const updatedUserRequest = await userRequestService.updateUserRequestStatus(userRequestId, status);
        res.status(200).send(updatedUserRequest)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}

const getUserRequest = async (req, res) => {
    const { userRequestId } = req.params;
    
    try {
        if (!userRequestId) {
            throw new AppError(messageMapping.userRequest.invalid_request_id, 400)
        }
        const userRequest = await userRequestService.getUserRequest(userRequestId)
        
        res.send(userRequest)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}

const getUserRequestsByUserId = async (req, res) => {
    const { userId } = req.params;
    
    try {
        if (!userId) {
            throw new AppError(messageMapping.userRequest.invalid_user_id, 400)
        }
        if (req.user.userId != userId) {
            res.status(403).send({ message: messageMapping.userRequest.invalid_request_id })
            return;
        }        
        const userRequests = await userRequestService.getUserRequestsByUserId(userId);
        
        res.send(userRequests)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}



export default {getUserRequest, getUserRequestsByUserId, addUserRequest, updateUserRequestStatus}