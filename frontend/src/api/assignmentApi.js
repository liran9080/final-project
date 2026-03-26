import SERVER from './serverAddress'
const basePath = '/api/assignments';


const getUserByProfessionalId = ({token, id}) =>{
     return fetch(`${SERVER}${basePath}/professionals/${id}`, {
          headers:{authorization:`bearer ${token}`},
     })
}

const getUserByUserId = ({token, id}) =>{
     return fetch(`${SERVER}${basePath}/users/${id}`, {
          headers:{authorization:`bearer ${token}`},
     })
}

export default {getUserByProfessionalId, getUserByUserId}