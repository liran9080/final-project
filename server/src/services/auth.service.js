import models from '../models/index.js'
import passwordService from '../middleware/password.service.js'
import AppError from '../errors/appError.js'
import userService from './user.service.js'
import messageMapping from '../config/messageMapping.json' with {type: 'json'}

const { User } = models

const register = async(user) => {

    // הצפנת הסיסמא
    user.password = await passwordService.encryptPassword(user.password)
    const createdUser = await User.create(user);
    
    return createdUser.get();
}


const login = async (email, password) => {

    // מוודאים שהאימייל לא קיים
    const existingUser = await userService.findUserByEmail(email)
    
    if (!existingUser) {
        throw new AppError(messageMapping.auth.email_password_incorrect, 400)
    }
    if(existingUser.isDisabled){
        throw new AppError(messageMapping.auth.user_disabled, 400)
    }
    if (await passwordService.verifyPassword(password, existingUser.password)) {
        const { password, ...userWithoutPassword } = existingUser.get();
        return userWithoutPassword;
    } else {
        throw new AppError(messageMapping.auth.email_password_incorrect, 400)
    }
}


export default { register, login }