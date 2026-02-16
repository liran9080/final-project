
import { Link } from 'react-router-dom';
import '../css/FoundationItem.css'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import useToggle from '../hooks/useToggle';

function FoundationItem({ foundation, editFoundation }) {
    const { isAdmin } = useContext(AuthContext)
    const { isOn, toggle } = useToggle();

    const handleEdit = (event) => {
        event.preventDefault();
        editFoundation(foundation.foundationId)
    }
    const handleDetails = (event) => {
        event.preventDefault();
        toggle();
    }
    return (
        <Link to={`/foundations/${foundation.foundationId}`} className='foundation-item'>
            <h4>{foundation.name}</h4>
            {isOn && <div>
                <div className='foundation-item_details'>
                    <span>{foundation.area}</span>
                    <span>{foundation.address}</span>
                    <span>{foundation.phone}</span>
                    <span>{foundation.email}</span>
                </div>
                <p>{foundation.description}</p>
            </div>}
            <div>
                <button onClick={handleDetails}>{isOn ? 'הצג פחות' : 'הצג יותר'}</button>
                {isAdmin() && <button onClick={handleEdit}>עדכון עמותה</button>}
            </div>
        </Link>
    )
}

export default FoundationItem;