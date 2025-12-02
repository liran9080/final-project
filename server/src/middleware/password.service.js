import bcrypt from 'bcrypt';

const encryptPassword = async(password) =>{
    // הצפנת הסיסמא, 12 הוא חוזק ההצפנה
    const hashedPassword = await bcrypt.hash(password, 12)
    return hashedPassword;
}

const verifyPassword = async(givenPassword, databasePassword) =>{
    
    try{
        const match = await bcrypt.compare(givenPassword, databasePassword);
        return match;
    }catch(error){
        return false;
    }
}

export default {encryptPassword, verifyPassword}