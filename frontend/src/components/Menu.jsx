import {Link} from 'react-router-dom'
import '../css/Menu.css'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Menu(){
  const {authData, clearAuthData:handleLogout} = useContext(AuthContext)
  
  const logout = () => {
    handleLogout();
  }
    return(
      <div className="menu">
        <Link to='/'>בית</Link>
       {!authData &&<> <Link to='/login'>כניסה</Link>
        <Link to='/register'>רישום</Link></>}
        {authData && <Link onClick={logout} to='/login'>יציאה</Link>}
        {authData && <Link to={`/users/${authData.user.userId}`}>פרטי משתמש</Link>}
        {authData && authData.user.isAdmin && <Link to='/users'>משתמשי האתר</Link>}
        <Link to='/categories'>קטגוריות</Link>
        {authData && <Link to='/requests'>בקשות</Link>}
        {authData && <Link to='/chats'>שיחות</Link>}
        <Link to='/search'>חיפוש</Link>
      </div>        
    )
}

export default Menu