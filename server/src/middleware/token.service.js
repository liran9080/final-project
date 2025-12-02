import Jwt from 'jsonwebtoken'

const SERVER_PASSWORD = '1q@W3e$R5t'
const NUM_OF_PAYLOAD_FIELDS = 4;

const createToken = (userPayload) => {
    const token = Jwt.sign(userPayload, SERVER_PASSWORD, { expiresIn: '1d' })
    return token;
}

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("bearer")) {
        res.status(401).send({ message: "missing authorization, please sign in" });
        return;
    }
    const authorization = req.headers.authorization.split(" ");
    if (authorization.length !== 2) {        
        res.status(401).send({ message: "invalid authorization, please sign in" });
        return;
    }
    const token = authorization[1];
    if (!token) {
        res.status(401).send({ message: "no authorization, please sign in" });
        return;
    }

    try {
        const userPayload = Jwt.verify(token, SERVER_PASSWORD) 
        console.log(userPayload);
        
        if (userPayload.isAdmin == undefined || !userPayload.userId || Object.keys(userPayload).length !== NUM_OF_PAYLOAD_FIELDS) {
            res.status(401).send({ message: "incorrect authorization, please sign in" });
            return;
        }
        req.user = userPayload;
        next();
    } catch (error) {
        res.status(401).send({ message: "missing authorization, please sign in" });
    }
}

const verifyAdmin = (req, res, next) => {
    if(!req.user){
        res.status(401).send({ message: "missing authorization, please sign in" });
        return;
    }
    if(req.user.isAdmin == false){
        res.status(403).send({ message: "You do not have permissions" });
        return;
    }
    next()
}
export default { createToken, verifyToken, verifyAdmin }