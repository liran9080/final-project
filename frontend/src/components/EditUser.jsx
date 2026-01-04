import { useEffect, useState, useContext } from "react";
import InputText from "../components/InputText";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import userApi from "../api/userApi";
import useHttp from "../hooks/useHttp";
import PageHead from "../components/PageHead";

import AuthContext from "../context/AuthContext";

function EditUser({ onClose, postSave }) {
    const ctx = useContext(AuthContext);

    const { send, message, loading, isError } = useHttp()
    const [user, setUser] = useState(null)

    const loadUser = async () => {
        const userResult = await send({ func: userApi.getUser, id: ctx.authData.user.userId });
        if (userResult.ok)
            setUser(userResult.data)
    }

    useEffect(() => {        
        loadUser()
    }, [])

    const handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setUser({ ...user, [id]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        //TODO update for http put on comment
        send({ func: userApi.updateUser, id: user.userId, data: user }).then(result => {
            if (result.ok) {
                onClose()
                postSave(result.data)
            }
        })
    }
    if (loading || !user) {
        return <Spinner />
    }
    if (!ctx.authData || !ctx.authData.user) {
        return <div>עליך להיכנס למערכת כדי לצפות בדף זה</div>
    }
    
    return (
        <div>
            <PageHead title='עדכון פרטים' />
            <Message message={message} isError={isError} />
            <form onSubmit={handleSubmit}>
                <InputText id="fullName" value={user.fullName} label="שם מלא" placeholder="שם מלא" onChange={handleChange} />
                <InputText id="email" value={user.email} rtl={false} label="אימייל" placeholder="אימייל" onChange={handleChange} />
                
                <button >שמירה</button>
            </form>
        </div>
    )
}

export default EditUser;