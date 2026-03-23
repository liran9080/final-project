import SERVER from './serverAddress'
const basePath = '/api/userrequests';

const updatUserRequests = ({token, id, data}) =>{
     return fetch(`${SERVER}${basePath}/${id}`, {
          method:'PUT',
          headers:{'Content-Type':'application/json', authorization:`bearer ${token}`},
          body:JSON.stringify(data)
     }); 
}
const getUserRequestByFoundation= ({token, id}) =>{
     return fetch(`${SERVER}${basePath}/foundations/${id}`, {
          headers:{authorization:`bearer ${token}`},
     })
}


export default {getUserRequestByFoundation, updatUserRequests}