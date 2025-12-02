import SERVER from './serverAddress'

const addComment = ({token, data}) =>{
     return fetch(`${SERVER}/api/comments`, {
          method:'POST',
          headers:{'Content-Type':'application/json', authorization:`bearer ${token}`},
          body:JSON.stringify(data)
     }); 
}
const updateComment = ({token, id, data}) =>{
     return fetch(`${SERVER}/api/comments/${id}`, {
          method:'PUT',
          headers:{'Content-Type':'application/json', authorization:`bearer ${token}`},
          body:JSON.stringify(data)
     }); 
}
const getCommentsByFoundation = ({token, id}) =>{
     return fetch(`${SERVER}/api/comments/foundations/${id}`)
}
const getComment = ({id}) => {
     return fetch(`${SERVER}/api/comments/${id}`);
}
const deleteComment = ({id, token}) => {
     return fetch(`${SERVER}/api/comments/${id}`, {
          method:'DELETE',
          headers:{ authorization:`bearer ${token}`},
     });
}
export default {addComment,updateComment, getCommentsByFoundation, getComment, deleteComment}