import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

import '../css/UserItem.css'

function UserItem({ user, disableUser }) {
    const { isLoggedin, authData } = useContext(AuthContext)
    
    if(!isLoggedin || !authData || authData.user.isAdmin == false){
        return <></>
    }
    return (
        <div className='user_item-container' >
            <div className='user_item-header'>
                <div className='user_item-header-text'>
                    <p className='user-id'>{user.userId}</p>
                    <p className='user-name'>{user.fullName}</p>
                    <p className='user-email'>{user.email}</p>
                    <p className='user-isadmin'>{user.isAdmin? ' מנהל באתר' : 'משתמש באתר'}</p>
                    <p className='user-isdisabled'>{user.isDisabled? 'מושבת' : 'פעיל'}</p>
                </div>
                <div className='comment_item-header-actions'>
                    {!user.isAdmin && <span className='comment_item-edit' onClick={() => disableUser(user)}>&#10060;</span>}
                </div>

            </div>

        </div>
    )
}

export default UserItem;