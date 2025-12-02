
import commentService from '../services/comment.service.js'
import messageMapping from '../config/messageMapping.json' with {type: 'json'}
import AppError from '../errors/appError.js'

const addComment = async (req, res) => {
    const comment = req.body
    try {
        if (!comment) {
            res.status(400).send({ message: messageMapping.comment.comment_not_sent })
            return;
        }
        if (req.user.userId != comment.userId) {
            res.status(400).send({ message: messageMapping.comment.invalid_userId })
            return;
        }
        const createdComment = await commentService.addComment(comment)
        res.status(201).send(createdComment)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}
const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const comment = req.body
    try {
        if (!commentId) {
            throw new AppError(messageMapping.comment.invalid_commentId, 404)
        }
        const updatedComment = await commentService.updateComment(commentId, comment);
        res.send(updatedComment)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}

const getCommentsByFoundation = async (req, res) => {
    const { foundationId } = req.params;
    try {
        if (!foundationId) {
            res.status(400).send({ message: messageMapping.comment.invalid_foundation })
            return;
        }
        const comments = await commentService.getCommentsByFoundation(foundationId)
        res.json(comments);
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }

}

const getComment = async (req, res) => {
    const { commentId } = req.params;
    try {
        if (!commentId) {
            throw new AppError(messageMapping.comment.invalid_commentId, 404)
        }
        const comment = await commentService.getComment(commentId)
        res.send(comment)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}

const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    console.log('commentId', commentId);
    
    try {
        if (!commentId) {
            throw new AppError(messageMapping.comment.invalid_commentId, 404)
        }
        await commentService.deleteComment(commentId)
        res.send()
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}

export default { addComment, updateComment, getCommentsByFoundation, getComment, deleteComment }