
import SERVER from './serverAddress'

const getUser = ({ token, id }) => {
     return fetch(`${SERVER}/api/users/${id}`, {
          headers: { authorization: `bearer ${token}` },
     });
}
const getUsers = ({ token }) => {
     return fetch(`${SERVER}/api/users`, {
          headers: { authorization: `bearer ${token}` },
     });
}
const updateUser = ({ token, id, data }) => {
     return fetch(`${SERVER}/api/users/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', authorization: `bearer ${token}` },
          body: JSON.stringify(data)
     });
}
const updatePassword = ({ token, id, data }) => {
     return fetch(`${SERVER}/api/users/password/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', authorization: `bearer ${token}` },
          body: JSON.stringify(data)
     });
}
const enableUser = ({ token, id }) => {
     return fetch(`${SERVER}/api/users/enable/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json', authorization: `bearer ${token}` },
     });
}

const disableUser = ({ token, id }) => {
     return fetch(`${SERVER}/api/users/${id}`, {
          method: 'DELETE',
          headers: { authorization: `bearer ${token}` },
     });
}

export default { getUser, getUsers, updateUser, updatePassword, disableUser, enableUser }