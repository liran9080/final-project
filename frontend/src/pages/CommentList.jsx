import CommentItem from '../components/CommentItem'

function CommentList({comments}) {

    return (
        <div>
            <h4>הערות</h4>
            {
                comments.map(comment => <CommentItem key={comment.id} comment={comment}/>)
            }
        </div>
    )
}

export default CommentList;