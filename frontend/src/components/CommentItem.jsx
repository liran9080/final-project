

import { useContext } from 'react';
import '../css/CommentItem.css'
import AuthContext from '../context/AuthContext';

function CommentItem({ comment, index, editComment, deleteComment }) {
    const { isLoggedin, authData } = useContext(AuthContext)
    const formatDate = (dateString) => new Date(dateString).toLocaleString('he')
    const canEdit = isLoggedin() && comment.userId == authData.user.userId;
    console.log(index);
    
    return (
        <div className='comment_item-container' >
            <div className='comment_item-header'>
                <div className='comment_item-header-text'>
                    <p>{index})</p>
                    <p>{formatDate(comment.createdAt)}</p>
                </div>
                {canEdit && <div className='comment_item-header-actions'>
                    <span className='comment_item-edit' onClick={() => editComment(comment.commentId)}>&#9997;</span>
                    <span className='comment_item-edit' onClick={() => deleteComment(comment.commentId)}>&#10060;</span>
                </div>}

            </div>
            <h4>{comment.text}</h4>
        </div>
    )
}

export default CommentItem;