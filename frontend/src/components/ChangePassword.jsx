import { useEffect, useState, useContext } from "react";
import InputText from "../components/InputText";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import userApi from "../api/userApi";
import useHttp from "../hooks/useHttp";
import PageHead from "../components/PageHead";

import AuthContext from "../context/AuthContext";

function ChangePassword({ onClose, postSave }) {
    const ctx = useContext(AuthContext);

    const { send, message, loading, isError, setMessage, setIsError } = useHttp()
    const [passwords, setPasswords] = useState({currentPassword:'', newPassword:'', verifyNewPassword:''})

    useEffect(() => {
       
    }, [])

    const handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setPasswords({ ...passwords, [id]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(passwords.newPassword != passwords.verifyNewPassword){
            setIsError(true);
            setMessage('הסיסמאות החדשות לא תואמות')
            return;
        }
        //TODO update for http put on comment
        send({ func: userApi.updatePassword, id: ctx.authData.user.userId, data: { existingPassword:passwords.currentPassword, newPassword: passwords.newPassword }  }).then(result => {
            if (result.ok) {
                onClose()
                postSave(result.data)
            }
        })
    }

    if (loading) {
        return <Spinner />
    }
    if (!ctx.authData || !ctx.authData.user) {
        return <div>עליך להיכנס למערכת כדי לצפות בדף זה</div>
    }
    
    return (
        <div>
            <PageHead title='עדכון סיסמא' />
            <Message message={message} isError={isError} />
            <form onSubmit={handleSubmit}>
                <InputText id="currentPassword" value={passwords.currentPassword} type="password" label="סיסמא נוכחית" placeholder="הקלידו את הסיסמא נוכחית" onChange={handleChange} rtl={false} />
                <InputText id="newPassword" value={passwords.newPassword} type="password" label="סיסמא חדשה" placeholder="הקלידו את הסיסמא החדשה" onChange={handleChange} rtl={false} />
                <InputText id="verifyNewPassword" value={passwords.verifyNewPassword} type="password" label="אימות סיסמא חדשה" placeholder="הקלידו את הסיסמא החדשה שנית" onChange={handleChange} rtl={false} />
                <button >שמירה</button>
            </form>
        </div>
    )
}

export default ChangePassword;