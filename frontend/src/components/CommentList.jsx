
import CommentItem from "./CommentItem";
import '../css/CommentList.css'

function CommentList({ comments, editComment, deleteComment }) {


    return (
        <div className="comment_list-container">
            {
                comments.map(comment => <CommentItem key={comment.commentId} comment={comment} editComment={editComment} deleteComment={deleteComment}/>)
            }
        </div>
    )
}

export default CommentList;