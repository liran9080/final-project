import { useState, useEffect, useCallback, useContext } from "react"
import { useParams } from "react-router-dom"
import useHttp from "../hooks/useHttp"
import foundationApi from "../api/foundationApi"
import commentsApi from "../api/commentApi"
import Message from "../components/Message"
import Spinner from "../components/Spinner"
import AddComment from "../components/AddComment";
import CommentList from "../components/CommentList";
import EditComment from "../components/EditComment";
import Modal from "../components/Modal";
import useEdit from "../hooks/useEdit"
import AuthContext from '../context/AuthContext'
import CreateRequest from '../components/request/CreateRequest'
import { generalSort } from "../utils/sortUtil"

import '../css/FoundationDetails.css'

function FoundationDetails() {
    const params = useParams()
    const { isLoggedin } = useContext(AuthContext)
    const [foundation, setFoundation] = useState({ categoryId: 0, name: '', area: '', address: '', phone: '', email: '', description: '' })
    const [comments, setComments] = useState([]);

    const { send, message, isError, loading } = useHttp();
    const {itemId, editItem, closeEditItem, deleteItem} = useEdit(send);


    const loadRFoundation = async (id) => {
        send({ func: foundationApi.getFoundation, id }).then(result => {
            if (result.ok) {
                setFoundation(result.data)
            }
        })
    }

    const loadComments = async (foundationId) => {
        send({ func: commentsApi.getCommentsByFoundation, id: foundationId }).then(result => {
            if (result.ok) {
                setComments(generalSort(result.data, 'createdAt'))
            }
        })
    }

    useEffect(() => {
        if (params.id) {
            loadRFoundation(params.id);
            loadComments(params.id)
        }
    }, [])  // מערך תלויות


    // תגובות
    const postCommentSave = useCallback((newComment) => {
        setComments(currentComments =>generalSort([...currentComments.filter(c => c.commentId != newComment.commentId), newComment], 'createdAt'))

    }, [])
    const deleteComment = useCallback((commentId) => {
        deleteItem(
            commentId, 
            commentsApi.deleteComment, 
            () => setComments(currentComments =>generalSort([...currentComments.filter(c => c.commentId != commentId)]), 'createdAt')
        )
    }, [])

    if (loading) {
        return (<Spinner />)
    }
    return (
        <div className='foundation_details-container'>
            <Message message={message} isError={isError} />
            <h2>{foundation.name}</h2>
            <p>{foundation.description}</p>
            <p>{foundation.area}</p>
            <p>{foundation.address}</p>
            <p>{foundation.phone}</p>
            <p>{foundation.email}</p>
            <hr/>
            {isLoggedin() && <CreateRequest />}
            <hr/>
            <AddComment foundationId={foundation.foundationId} postSave={postCommentSave} />
            <Modal component={<EditComment commentId={itemId} onClose={closeEditItem} postSave={postCommentSave} />} onClose={closeEditItem} isOn={itemId > -1} />
            <CommentList comments={comments} editComment={editItem} deleteComment={deleteComment} />
        </div>
    )
}

export default FoundationDetails