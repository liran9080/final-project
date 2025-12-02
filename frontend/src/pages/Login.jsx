import { useState, useContext } from "react";
import Message from "../components/Message";
import InputText from "../components/InputText";
import authApi from "../api/authApi";
import useHttp from "../hooks/useHttp";
import PageHead from '../components/PageHead'
import Spinner from "../components/Spinner";
import {useNavigate} from 'react-router-dom'
import AuthContext from "../context/AuthContext";
import useToggle from "../hooks/useToggle";

function Login() {
    const nav = useNavigate();
    const context = useContext(AuthContext)
    const {send, message, loading, isError, setMessage, setIsError} = useHttp()
    const [login, setLogin] = useState({ email: '', password: '' })
    const {isOn, toggle} = useToggle()

    const handleChange = (event) => {
        const id = event.target.id
        const value = event.target.value;
        setLogin({ ...login, [id]:value})   //{ email: 'l', password: '', email:'li' } => { email: 'li', password: '' }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        send({func: authApi.login, data:login}).then(result =>{
            if(result.ok){
                context.setAuthData(result.data)
                sessionStorage.setItem('auth', JSON.stringify(result.data))
                setIsError(false);
                toggle()
                setMessage('אימות התבצע בהצלחה, הנך מועבר לדף קטגוריות')
                window.setTimeout(() => {
                    nav('/categories')
                }, 4000)
            }
        });
    }
    if(loading){
        return <Spinner/>
    }
    return (
        <div>
            <PageHead title="כניסה למערכת"/>
            <Message message={message} isError={isError} />
            <form onSubmit={handleSubmit}>
            {isOn && <div style={{backgroundColor:'#EFEFEF', opacity:0.4, position:'absolute', left:0, right:0, height:'200px'}}></div>}
                <InputText id="email" value={login.email} type="email" label="אימייל" placeholder="הקלידו את כתובת האימייל שלכם" onChange={handleChange} rtl={false} />
                <InputText id="password" value={login.password} type="password" label="סיסמא" placeholder="הקלידו את הסיסמא" onChange={handleChange} rtl={false} />
                <button>כניסה</button>
            </form>
        </div>
    )
}

export default Login;