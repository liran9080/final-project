
import { Link } from 'react-router-dom';
import '../css/FoundationItem.css'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
function FoundationItem({foundation, editFoundation}){
    const {isAdmin} = useContext(AuthContext)
    const handleEdit = (event) =>{
        event.preventDefault();
        editFoundation(foundation.foundationId)
    }
    return(
        <Link to={`/foundations/${foundation.foundationId}`} className='foundation-item'>
            <h4>{foundation.name}</h4>
            <div>
                <span>{foundation.area}</span>
                <span>{foundation.address}</span>
                <span>{foundation.phone}</span>
                <span>{foundation.email}</span>
            </div>
            <p>{foundation.description}</p>
            {isAdmin() && <button onClick={handleEdit}>עדכון עמותה</button>}
        </Link>
    )
}

export default FoundationItem;