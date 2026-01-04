import { useEffect, useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import UserItem from "../components/UserItem";
import useHttp from "../hooks/useHttp";
import userApi from "../api/userApi";
import useToggle from '../hooks/useToggle';
import Confirm from "../components/gui/Confirm";
import Modal from "../components/Modal";
import '../css/CommentList.css'
import useConfirm from "../hooks/useConfirm";

function UserList() {
    const [users, setUsers] = useState([]);
    const { isLoggedin, authData } = useContext(AuthContext);
    const { send, message, loading, isError } = useHttp();

    const confirm = useConfirm();

    const loadUsers = async () => {
        const usersResult = await send({ func: userApi.getUsers });
        if (usersResult.ok)
            setUsers(usersResult.data)
    }

    useEffect(() => {
        loadUsers()
    }, [])

    const confirmChangeState = (user) => {
        confirm.setSubject(user)
        if(!user.isDisabled)
            confirm.setPrompt(`האם להשבית את המשתמש ${user.fullName}`)
        else
            confirm.setPrompt(`האם להפעיל את המשתמש ${user.fullName}`)
        confirm.show();
    }
    const changeUserState = async () =>{
        let apiFunc = undefined; //userApi.disableUser;
        if(!confirm.subject.isDisabled)
            apiFunc = userApi.disableUser;
        else
            apiFunc = userApi.enableUser

        const disableResult = await send({ func: apiFunc, id:confirm.subject.userId });
        if (disableResult.ok)
            setUsers( users => [...users.filter(u => u.userId != confirm.subject.userId), disableResult.data])
        confirm.reset();
    }

    if (!isLoggedin || !authData || authData.user.isAdmin == false) {
        return <>לא ניתן להציג ללא הרשאת מנהל</>
    }
    return (
        <div>
            <Modal component={<Confirm question={confirm.prompt} onNo={confirm.hide} onYes={changeUserState} />} isOn={confirm.isVisible} onClose={confirm.hide}/>
            
            <div className="comment_list-container">
                {
                    users.map(user => <UserItem key={user.userId} user={user} disableUser={confirmChangeState} />)
                }
            </div>
        </div>
    )
}

export default UserList;