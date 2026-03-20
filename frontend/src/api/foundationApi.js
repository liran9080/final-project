import SERVER from './serverAddress'

const getFoundation = ({id}) => {
     return fetch(`${SERVER}/api/foundations/${id}`);       
     //http://127.0.0.1:5566/api/foundations/1
}
const getFoundations = ({id}) => {
     return fetch(`${SERVER}/api/foundations/categories/${id}`);
}
const getAllFoundations = () => {
     return fetch(`${SERVER}/api/foundations`);
}
const getFoundationAreas = ({token}) => {
     return fetch(`${SERVER}/api/foundations/areas`);
}
const addFoundation = ({token, data}) =>{
     return fetch(`${SERVER}/api/foundations`, {
          method:'POST',
          headers:{'Content-Type':'application/json', authorization:`bearer ${token}`},
          body:JSON.stringify(data)
     }); 
}
const updateFoundation = ({token, id, data}) =>{
     return fetch(`${SERVER}/api/foundations/${id}`, {
          method:'PUT',
          headers:{'Content-Type':'application/json', authorization:`bearer ${token}`},
          body:JSON.stringify(data)
     }); 
}

export default {getFoundation, getFoundations,getAllFoundations, getFoundationAreas, addFoundation, updateFoundation}