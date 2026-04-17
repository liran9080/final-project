import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import useEdit from "../hooks/useEdit";
import Modal from "../components/Modal";
import EditUser from "../components/EditUser";
import ChangePassword from "../components/ChangePassword";
import useHttp from "../hooks/useHttp";
import pfApi from '../api/professionalFoundationApi'

const UserPage = () => {
    const ctx = useContext(AuthContext);
    const [professionalDetails, setProfessionalDetails] = useState(null)
    const { itemId: editUserId, editItem: openEditUser, closeEditItem: closeEditUser, } = useEdit(null);
    const { itemId: pwdUserId, editItem: openPwdUser, closeEditItem: closePwdUser, } = useEdit(null);

    const {message, loading, send, isError} = useHttp();
    useEffect(()=>{
        if(!ctx.authData || !ctx.authData.user)return;
        loadProfessionalDetails();
    }, [])
    if(!ctx.authData || !ctx.authData.user){
        return <div>עליך להיכנס למערכת כדי לצפות בדף זה</div>
    }

    const loadProfessionalDetails = async() =>{
        const result = await send({func: pfApi.getProfessionalFoundation, id:ctx.authData.user.userId});
        if(result.ok){
                setProfessionalDetails(result.data);
                console.log(result.data);
        }
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
            <p>{user.isProfessional? 'איש מקצוע':'מבקש שירות'}</p>
            {professionalDetails != null && <p>עוסק בעמותה: {professionalDetails.foundation.name}</p>}
            <p>{user.isAdmin? ' מנהל באתר' : 'משתמש באתר'}</p>
            <button type="button" onClick={editUser}>עדכון פרטים</button>
            <button type="button" onClick={editUserPassword}>עדכון סיסמא</button>
            <Modal component={<EditUser onClose={closeEditUser} postSave={postSave} />} onClose={closeEditUser} isOn={editUserId > -1} />
            <Modal component={<ChangePassword onClose={closePwdUser} postSave={()=>{}} />} onClose={closePwdUser} isOn={pwdUserId > -1} />
        </div>
    )
}

export default UserPage;