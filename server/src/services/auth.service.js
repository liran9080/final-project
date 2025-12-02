import models from '../models/index.js'
import passwordService from '../middleware/password.service.js'
import AppError from '../errors/appError.js'

const { User } = models

const register = async(user) => {

    // הצפנת הסיסמא
    user.password = await passwordService.encryptPassword(user.password)
    const createdUser = await User.create(user);
    
    return createdUser.get();
}


const login = async (email, password) => {

    // מוודאים שהאימייל לא קיים
    const existingUser = await findUserByEmail(email)
    
    if (!existingUser) {
        throw new AppError(`email ${email} or password are incorrect not exist`, 400)
    }
    if (await passwordService.verifyPassword(password, existingUser.password)) {
        const { password, ...userWithoutPassword } = existingUser.get();
        return userWithoutPassword;
    } else {
        throw new AppError(`email ${email} or password are incorrect not exist`, 400)
    }
}


const findUserByEmail = async (email) => {
    const existingUser = await User.findOne({
        where: {
            email: email
        }
    })
    return existingUser
}

export default { register, login, findUserByEmail }