import { useContext, useRef, useState } from "react";
import useHttp from "../hooks/useHttp";
import commentsApi from "../api/commentApi";
import Spinner from "./Spinner";
import Message from "./Message";
import AuthContext from '../context/AuthContext'

import '../css/AddComment.css'

function AddComment({ foundationId, postSave }) {
    const { authData } = useContext(AuthContext)
    const text = useRef(null)
    const [error, setError] = useState('')
    const { send, loading, isError, message } = useHttp()

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!text.current) return;
        if (text.current.value.length < 3) {
            setError('הערה חייבת להכיל לפחות 3 תוים')
            return;
        }
        setError('')
        const date = new Date();
        const createdDate = date.toLocaleDateString('he')
        const comment = { foundationId: foundationId, userId: authData.user.userId, createdDate: createdDate, text: text.current.value }
        send({ func: commentsApi.addComment, data: comment }).then(result => {
            if (result.ok) {
                postSave(result.data)
            }
        })
    }

    // שמירה
    // react: http post(comment) -> server -> comment.route -> comment.controller -> comment.service -> save to postgresql
    if (loading) return <Spinner />
    if(!authData)return null;
    return (
        <form onSubmit={handleSubmit} className='add_comment-container'>
            <h4>הוספת הערה לעמותה</h4>
            <Message message={message} isError={isError} />
            <Message message={error} isError={true} />
            <div className='add_comment-inputs'>
                <label htmlFor="comment">הערה</label>
                <textarea id="comment" placeholder="הקלידו את ההערה" ref={text} rows={3} cols={50}></textarea>
                <button>שמירה</button>
            </div>
        </form>
    )
}

export default AddComment;