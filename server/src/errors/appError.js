export default class AppError extends Error{

    constructor(message, httpCode){
        super(message)
        this.httpCode = httpCode;
    }
}