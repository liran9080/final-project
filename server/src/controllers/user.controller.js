import service from '../services/user.service.js'
import messageMapping from '../config/messageMapping.json' with {type: 'json'}

const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        // רק אם הפרמטר שייך למשתמש הנוכחי
        if(req.user.userId != userId){
            res.status(403).send({message: messageMapping.user.no_permissions})
            return;
        }

        const user = await service.getUser(userId);
        res.send(user)
    } catch (error) {
        res.status(error.httpCode || 500).send(error.message)
    }

}

const getUsers = async (req, res) => {
    try {
        // רק אם המשתמש הוא אדמין
        const users = await service.getUsers()
        res.json(users);

    } catch (error) {
        res.status(error.httpCode || 500).send(error.message);
    }
}

const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = req.body
        // רק אם הפרמטר שייך למשתמש הנוכחי
        if(req.user.userId != userId){
            res.status(403).send({message: messageMapping.user.no_permissions})
            return;
        }        

        if (userId != user.userId) {
            res.status(400).json({ message: messageMapping.user.invalid_data })
            return;
        }
        const updatedUser = await service.updateUser(userId, user)
        res.send(updatedUser)
    } catch (error) {
        res.status(error.httpCode || 500).send({message:error.message});
    }
}


const updatePassword = async (req, res) => {
    try {
        const { userId } = req.params;
        const { existingPassword, newPassword } = req.body;
        // רק אם הפרמטר שייך למשתמש הנוכחי
        if(req.user.userId != userId){
            res.status(403).send({message: messageMapping.user.no_permissions})
            return;
        }        
        await service.updatePassword(userId, existingPassword, newPassword);
        res.send({ message: messageMapping.user.password_updated })
    } catch (error) {
        res.status(error.httpCode || 500).send({message:error.message});
    }
}
const disableUser = async (req, res) =>{
    try{
        const { userId } = req.params;
        const updatedUser = await service.disableUser(userId)
        res.send(updatedUser)
    }catch(error){
        res.status(error.httpCode || 500).send({message:error.message});
    }
}
const enableUser = async (req, res) =>{
    try{
        const { userId } = req.params;
        const updatedUser = await service.enableUser(userId)
        res.send(updatedUser)
    }catch(error){
        res.status(error.httpCode || 500).send({message:error.message});
    }
}
export default { getUser, getUsers, updateUser,updatePassword, disableUser, enableUser}