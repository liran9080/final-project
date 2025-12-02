import service from '../services/auth.service.js'
import tokenService from '../middleware/token.service.js'

const ADMIN_CODE = '12rsd1'
const SECOND = 1000;
const MAX_LOGIN_ATTEMPTS = 1000;
const loginAttempts = {}

const addLoginAttempt = (email) => {
    if (!loginAttempts[email]) {
        loginAttempts[email] = 1
    }else{
        loginAttempts[email]++;
    }
    setTimeout(() => {
        loginAttempts[email]=0;
    }, 10*SECOND)
}
const isBlocked = (email) =>{
    return loginAttempts[email] && loginAttempts[email] >= MAX_LOGIN_ATTEMPTS;
}


const register = async (req, res) => {
    const { user, adminCode } = req.body;
    try {
        if (adminCode && adminCode == ADMIN_CODE) {    // אם המשתמש קיבל קוד מהנהלת האתר (לא חשוב איך) אז הוא ירשם כמנהל מערכת
            user.isAdmin = true;
        }else{
            user.isAdmin = false;
        }
        const existingUser = await service.findUserByEmail(user.email); // נבדוק אם האימייל כבר קיים
        if (existingUser) {   // אם האימייל קיים נחזיר שגיאה עם הודעה
            res.status(400).send({ message: 'email already exist' });
            return;
        }
        const createdUser = await service.register(user);   // יצירת המשתמש החדש
        res.status(201).send(createdUser)
    } catch (error) {
        res.status(error.httpCode || 500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body    // 
    if(isBlocked(email)){
        throw new AppError(`too many attemps, please try again in a few minutes`, 400)
    }    
    if(!email || !password){
        throw new AppError(`invalid email or password`, 400)
    }
    try {
        const existingUser = await service.login(email, password)
        // console.log('{userId: existingUser.userId, isAdmin:existingUser.isAdmin}', existingUser, {userId: existingUser.userId, isAdmin:existingUser.isAdmin});
        
        const token = tokenService.createToken({userId: existingUser.userId, isAdmin:existingUser.isAdmin})
        res.send({ user:existingUser, token })
    } catch (error) {
        addLoginAttempt(email)
        res.status(error.httpStatus || 400).json({ message: error.message });
    }
}

export default { login, register }