import { useEffect, useState } from "react";
import Textarea from "../components/Textarea";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import commentApi from "../api/commentApi";
import useHttp from "../hooks/useHttp";
import PageHead from "../components/PageHead";

function EditComment({commentId, onClose, postSave}) {

    const {send, message, loading, isError} = useHttp()
    const [comment, setComment] = useState({commentId:-1,text:'', createdAt:'', foundationId:-1, userId:-1})
    
    const loadComment = async() => {
        const commentResult = await send({ func: commentApi.getComment, id: commentId });
        if (commentResult.ok)
            setComment(commentResult.data)   
    }

    useEffect(() => {        
        loadComment()
    }, [])
    
    const handleChange = (event) =>{
        const id = event.target.id;
        const value = event.target.value;
        setComment({...comment, [id]:value})
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();    

        //TODO update for http put on comment
        send({func: commentApi.updateComment, id:comment.commentId, data:comment}).then(result => {
            if(result.ok){
                onClose()
                postSave(result.data)
            }
        })
    }
    if (loading) {
        return <Spinner />
    }
    
    return (
        <div>
            <PageHead title='עדכון זכות' />
            <Message message={message} isError={isError} />
            <form onSubmit={handleSubmit}>

                <Textarea id="text" value={comment.text} label="תגובה" onChange={handleChange} />
                <button >שמירה</button>
            </form>
        </div>
    )
}

export default EditComment;