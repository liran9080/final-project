import SERVER from './serverAddress'
const basePath = '/api/chats';

const getChat = ({token, data}) =>{
     const {userId, professionalId} = data
      return fetch(`${SERVER}${basePath}?userId=${userId}&professionalId=${professionalId}`, {
          headers:{authorization:`bearer ${token}`},
     })
}
const addMessage = ({token, id, data}) =>{
     return fetch(`${SERVER}${basePath}`, {
          method:'POST',
          headers:{'Content-Type':'application/json', authorization:`bearer ${token}`},
          body:JSON.stringify(data)
     }); 
}

const markAsRead = ({token, data}) => {
     return fetch(`${SERVER}${basePath}/${id}`, {
          headers:{authorization:`bearer ${token}`},
     });
}

export default {getChat, addMessage, markAsRead}