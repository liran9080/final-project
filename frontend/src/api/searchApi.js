import SERVER from './serverAddress'

const searchText = ({data}) => {
     return fetch(`${SERVER}/api/search?${data}`);
}

export default {searchText}