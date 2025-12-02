import SERVER from './serverAddress'

// const getCategories = () => {
//      fetch('http://127.0.0.1:5566/api/categories').then(result => {
//             if(result.status >= 400){
//                 return [];
//             }
//             return result.json()    // ממיר ג׳ייסון לאובייקט
//         })
// }
const getCategories =  ({token}) => {
     return fetch(`${SERVER}/api/categories`);
}

const getCategory =  ({id}) => {
    return fetch(`${SERVER}/api/categories/${id}`);
}

export default {getCategories, getCategory}