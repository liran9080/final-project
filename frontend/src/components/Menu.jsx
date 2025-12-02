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
        <Link to='/categories'>קטגוריות</Link>
        <Link to='/search'>חיפוש</Link>
      </div>        
    )
}

export default Menu