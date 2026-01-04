
import AppError from '../errors/appError.js';
import models from '../models/index.js'
import messageMapping from '../config/messageMapping.json' with {type: 'json'}
import passwordService from '../middleware/password.service.js'

const { User } = models

const findUserByEmail = async (email) => {
    const existingUser = await User.findOne({
        where: {
            email: email
        }
    })
    return existingUser
}

const getUser = async (userId) => {

    const user = await User.findByPk(userId);
    if (!user) {
        throw new AppError(messageMapping.user.not_found, 404)
    }
    const { password, ...userWithoutPassword } = user.get();
    return userWithoutPassword;
}

const getUsers = async () => {
    const users = await User.findAll()
    return users;
}

const updateUser = async (userId, user) => {

    // מוודאים שהמשתמש קיים
    const existingUser = await User.findByPk(userId)

    if (!existingUser) {
        throw new AppError(messageMapping.user.not_found, 400)
    }
    if(user.email != existingUser.email){
        const existingEmail = await findUserByEmail(user.email); // נבדוק אם האימייל כבר קיים

        if (existingEmail) {   // אם האימייל החדש קיים נחזיר שגיאה עם הודעה
            throw new AppError(messageMapping.user.email_exist, 400)
        }
        existingUser.email = user.email;
    }
    existingUser.fullName = user.fullName;

    const updatedUser = await existingUser.save()
    const { password, ...userWithoutPassword } = updatedUser.get();
    return userWithoutPassword;
}

const updatePassword = async(userId, existingPassword, newPassword) =>{
    const existingUser = await User.findByPk(userId)

    if (!existingUser) {
        throw new AppError(messageMapping.user.not_found, 400);
    }
    if (!await passwordService.verifyPassword(existingPassword, existingUser.password)){
        throw new AppError(messageMapping.user.invalid_password, 400)
    }
    const encryptedPassword = await passwordService.encryptPassword(newPassword)
    existingUser.password = encryptedPassword;
    await existingUser.save();
}

const disableUser = async (userId) => {
    // מוודאים שהמשתמש קיים
    const existingUser = await User.findByPk(userId)

    if (!existingUser) {
        throw new AppError(messageMapping.user.not_found, 400)
    }
    if(existingUser.isDisabled == true){
        throw new AppError(messageMapping.user.incorrect_state_disable, 400)
    }
    existingUser.isDisabled = true;

    const updatedUser = await existingUser.save()
    const { password, ...userWithoutPassword } = updatedUser.get();
    return userWithoutPassword;
}
const enableUser = async (userId) => {
    // מוודאים שהמשתמש קיים
    const existingUser = await User.findByPk(userId)

    if (!existingUser) {
        throw new AppError(messageMapping.user.not_found, 400)
    }
    if(existingUser.isDisabled == false){
        throw new AppError(messageMapping.user.incorrect_state_enable, 400)
    }

    existingUser.isDisabled = false;

    const updatedUser = await existingUser.save()
    const { password, ...userWithoutPassword } = updatedUser.get();
    return userWithoutPassword;
}

export default { getUser, getUsers, updateUser, updatePassword,findUserByEmail,disableUser, enableUser }