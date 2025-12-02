
import SERVER from './serverAddress'

const login =  ({data}) => {
     return fetch(`${SERVER}/api/auth/login`, {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
     });
}
const register =  ({data}) => {
     return fetch(`${SERVER}/api/auth/register`, {
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
     });
}

export default {login, register}