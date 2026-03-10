import SERVER from './serverAddress'
const basePath = '/api/userrequests';

const addUserRequest = ({token, data}) =>{
     return fetch(`${SERVER}${basePath}`, {
          method:'POST',
          headers:{'Content-Type':'application/json', authorization:`bearer ${token}`},
          body:JSON.stringify(data)
     }); 
}
const updatUserRequests = ({token, id, data}) =>{
     return fetch(`${SERVER}${basePath}/${id}`, {
          method:'PUT',
          headers:{'Content-Type':'application/json', authorization:`bearer ${token}`},
          body:JSON.stringify(data)
     }); 
}
const getUserRequestByUser = ({token, id}) =>{
     return fetch(`${SERVER}${basePath}/users/${id}`, {
          headers:{authorization:`bearer ${token}`},
     })
}
const getUserRequest = ({id}) => {
     return fetch(`${SERVER}${basePath}/${id}`, {
          headers:{authorization:`bearer ${token}`},
     });
}

export default {addUserRequest, updatUserRequests, getUserRequestByUser, getUserRequest}