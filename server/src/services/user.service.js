import data from '../../database.js'

const getUser = (req, res) => {
    const { userId } = req.params;
    // רק אם הפרמטר שייך למשתמש הנוכחי

    const user = data.db.users.find(b => b.id == userId)

    if (user) {
        res.json(founuserdRight);
    } else {
        res.status(404).json({ message: `user ${userId} not found` });
    }
}

const getUsers = (req, res) => {
    // רק אם המשתמש הוא אדמין

    res.json(data.db.users);
}

const updateUser = (req, res) =>{
    const {userId} = req.params;
    const user = req.body    
    // רק אם הפרמטר שייך למשתמש הנוכחי

    // מוודאים שהמשתמש קיים קיים
    const userIndex = data.db.users.findIndex(b => b.id == userId );
    if(userIndex == -1){
        res.status(400).json({message: `invalid User ${benefitId}`})
    }

    data.db.users[userIndex] = user
    data.save()
    res.status(200).json(user)
}


export default {getUser, getUsers,updateUser}