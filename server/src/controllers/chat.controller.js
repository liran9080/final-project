
import chatService from '../services/chat.service.js'
import messageMapping from '../config/messageMapping.json' with {type: 'json'}
import AppError from '../errors/appError.js'

//getChatByParticipants, addChat, updateAsRead

// http://127.0.0.1:8080/api/chats?userId=123&professionalId=234
const getChatByParticipants = async (req, res) => {
    const {userId, professionalId} = req.query
    console.log("aaa", req.query, userId, professionalId);
    
    try {
        if (!userId || !professionalId) {
            res.status(400).send({ message: messageMapping.chat.missing_participants})
            return;
        }
        if (req.user.userId != userId && req.useruserId != professionalId) {
            res.status(403).send({ message: messageMapping.chat.no_permissions })
            return;
        }

        const chat = await chatService.getChatByParticipants(userId, professionalId);
        res.status(200).send(chat)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}

const addMessage = async (req, res) => {
    const {message} = req.body;
    try{
        if(!message){
            res.status(400).send({ message: messageMapping.chat.invalid_messages})
            return;
        }
        const createdMessage = await chatService.addChat(message)
        res.status(201).send(createdMessage)
    }catch (error) {
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


export default {getChatByParticipants, addMessage}