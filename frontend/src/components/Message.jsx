import '../css/Message.css'
function Message({message, isError=true}){
    if(!message)return null;
    return(
        <div className="message">
            {message && <h4 className={isError?'error':'success'}>{message}</h4>}
        </div>
    )
}

export default Message