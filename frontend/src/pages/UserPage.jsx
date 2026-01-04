import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import useEdit from "../hooks/useEdit";
import Modal from "../components/Modal";
import EditUser from "../components/EditUser";
import ChangePassword from "../components/ChangePassword";

const UserPage = () => {
    const ctx = useContext(AuthContext);
    const { itemId: editUserId, editItem: openEditUser, closeEditItem: closeEditUser, } = useEdit(null);
    const { itemId: pwdUserId, editItem: openPwdUser, closeEditItem: closePwdUser, } = useEdit(null);

    if(!ctx.authData || !ctx.authData.user){
        return <div>עליך להיכנס למערכת כדי לצפות בדף זה</div>
    }
    const editUser = () =>{
        openEditUser(user.userId)
    }
    const postSave = (updatedUser) => {
        ctx.updateUserData(updatedUser)
    }
    const editUserPassword = () =>{
        openPwdUser(user.userId)
    }    
    const {user} = ctx.authData
    return(
        <div>
            <p>{user.fullName}</p>
            <p>{user.email}</p>
            <p>{user.isAdmin? ' מנהל באתר' : 'משתמש באתר'}</p>
            <button type="button" onClick={editUser}>עדכון פרטים</button>
            <button type="button" onClick={editUserPassword}>עדכון סיסמא</button>
            <Modal component={<EditUser onClose={closeEditUser} postSave={postSave} />} onClose={closeEditUser} isOn={editUserId > -1} />
            <Modal component={<ChangePassword onClose={closePwdUser} postSave={()=>{}} />} onClose={closePwdUser} isOn={pwdUserId > -1} />
        </div>
    )
}

export default UserPage;