import SERVER from './serverAddress'
const basePath = '/api/professionalfoundations';

const getProfessionalFoundation = ({token, id, data}) =>{
     return fetch(`${SERVER}${basePath}/professionals/${id}`); 
}
const getProfessionalList = ({token, id, data}) =>{
     return fetch(`${SERVER}${basePath}/foundations/${id}`); 
}



export default {getProfessionalFoundation, getProfessionalList}