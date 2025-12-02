import models from '../models/index.js'
import foundationService from './foundation.service.js'
import messageMapping from '../config/messageMapping.json' with {type: 'json'}
import AppError from '../errors/appError.js'

const { Comment } = models

const getComment = async (commentId) => {

    const comment = await Comment.findByPk(commentId)
    return comment;
}

const getCommentsByFoundation = async (foundationId) => {

    const comments = await Comment.findAll({ raw: true, where: { foundationId: foundationId } })

    return comments.sort((c1, c2) => c1.createdAt.toString().localeCompare(c2.createdAt.toString()))
}

const addComment = async (comment) => {

    // מוודאים שהעמותה קיימת
    const foundation = await foundationService.getFoundation(comment.foundationId)

    if (!foundation) {
        throw new AppError(`${messageMapping.comment.foundation_not_found} ${comment.foundationId}`, 400)
    }
    comment.createdDate = undefined
    const createdComment = await Comment.create(comment)

    return createdComment;
}

const updateComment = async (commentId, comment) => {


    const existingComment = await Comment.findByPk(commentId)

    if (!existingComment) {
        throw new AppError(messageMapping.comment.invalid_commentId, 400)
    }

    existingComment.text = comment.text;

    const updatedComment = await existingComment.save()
    return updatedComment;
}

const deleteComment = async (commentId) => {
    // const comment = await Comment.findByPk(commentId)
    // if (!comment) {
    //     throw new AppError(messageMapping.comment.invalid_commentId, 400)
    // }
    // await comment.destroy();

    const numOfComments = await Comment.destroy({where:{commentId:commentId}});
    if(numOfComments != 1){
        throw new AppError(messageMapping.comment.invalid_commentId, 400)
    }
}

export default { getComment, getCommentsByFoundation, addComment, updateComment, deleteComment }