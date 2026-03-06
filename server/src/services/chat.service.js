import {Op} from 'sequelize'
import models from '../models/index.js'
import foundationService from './foundation.service.js'
import userService from './user.service.js'
import messageMapping from '../config/messageMapping.json' with {type: 'json'}
import AppError from '../errors/appError.js'

const { Chat } = models
// create char
// update messages as read

const getChatByParticipants = async (userId, professionalId) => {

    const chat = await Chat.findAll({
        raw: true, 
        where: { 
            [Op.or]:[{senderId:userId, receiverId:professionalId}],
            [Op.or]:[{senderId:professionalId, receiverId:userId}],
        } 
    })
    return chat.sort( (m1, m2) =>{
        // m1 < m2 => -1
        // m1 == m2 => 0
        // m1 > m2 => 1
        const dateCompare = m1.createdDate.toString().localeCompare(m2.createdDate).toString()
        if(dateCompare == 0){
            return m1.createdTime.toString().localeCompare(m2.createdTime).toString()
        }
        return dateCompare
    } );
}



const addChat = async (chat) => {

    // מוודאים שהמשתמש קיים
    const sender = await userService.getUser(chat.senderId)

    if (!sender) {
        throw new AppError(`${messageMapping.comment.foundation_not_found} ${comment.foundationId}`, 400)
    }

    const receiverId = await userService.getUser(chat.receiverId)
    if (!receiverId) {
        throw new AppError(`${messageMapping.comment.foundation_not_found} ${comment.foundationId}`, 400)
    }    

    chat.createdDate = undefined
    chat.createdTime = undefined
    const createdChat = await Chat.create(chat)

    return createdChat;
}

const updateAsRead = async (userId, professionalId) => {

    await Chat.update({read:true}, {where: { 
            [Op.or]:[{senderId:userId, receiverId:professionalId}],
            [Op.or]:[{senderId:professionalId, receiverId:userId}],
        }} )
    

    
    return await getChatByParticipants(userId, professionalId);
}



export default { getChatByParticipants, addChat, updateAsRead }