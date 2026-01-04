import SERVER from './serverAddress'

const getBenefit = ({id}) => {
     return fetch(`${SERVER}/api/benefits/${id}`);
}
const getBenefits = ({id}) => {
     return fetch(`${SERVER}/api/benefits?categoryId=${id}`);
}
const addBenefit = ({token, data}) =>{
     return fetch(`${SERVER}/api/benefits`, {
          method:'POST',
          headers:{'Content-Type':'application/json', authorization:`bearer ${token}`},
          body:JSON.stringify(data)
     }); 
}
const updateBenefit = ({token, id, data}) =>{
     return fetch(`${SERVER}/api/benefits/${id}`, {
          method:'PUT',
          headers:{'Content-Type':'application/json', authorization:`bearer ${token}`},
          body:JSON.stringify(data)
     }); 
}
const deleteBenefit = ({token,id}) => {
     return fetch(`${SERVER}/api/benefits/${id}`,{
          method:'DELETE',
          headers:{authorization:`bearer ${token}`},
     });
}

export default {getBenefits, addBenefit, updateBenefit, getBenefit, deleteBenefit}