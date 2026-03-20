import { useState, useEffect } from "react";
import InputText from "../components/InputText";
import useHttp from '../hooks/useHttp'
import authApi from "../api/authApi";
import foundationApi from '../api/foundationApi';
import Message from "../components/Message";
import PageHead from "../components/PageHead";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";
import {generalSort} from '../utils/sortUtil'

import '../css/register.css'

function Register() {
    const nav = useNavigate()
    const { send, message, loading, isError, setMessage, setIsError } = useHttp()
    const [user, setUser] = useState({ fullName: '', email: '', phone: '', password: '', isProfessional:false })
    const [hasAdminCode, setHasAdminCode] = useState(false);
    const [foundationId, setFoundationId] = useState(-1);
    const [adminCode, setAdminCode] = useState("");
    const [foundations, setFoundations] = useState([]);

    const loadFoundations = async() => {
         const foundationsResult = await send({ func: foundationApi.getAllFoundations });
                if (foundationsResult.ok) {
                    generalSort(foundationsResult.data, 'name')
                    setFoundations(foundationsResult.data)
                }
    }
    useEffect(() =>{
        loadFoundations();
    }, [])
    const handleAdminCode = event => {
        const value = event.target.value;
        setAdminCode(value)
    }

    const handleHasAdminCode = event => {
        const value = event.target.value == "true" ? true : false;
        setHasAdminCode(value)
    }
    const handleIsProfessional = event => {
        const value = event.target.checked;
        setUser({ ...user, isProfessional: value })
    }
    const handleFoundation = (event) => {
        const foundationId = event.target.value
        setFoundationId(+foundationId)
    }
    const handleChange = (event) => {
        const id = event.target.id
        const value = event.target.value;
        setUser({ ...user, [id]: value })   //{ email: 'l', password: '', email:'li' } => { email: 'li', password: '' }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        if(user.isProfessional && foundationId == -1){
            setIsError(true);
            setMessage('יש לבחור עמותה ברישום כאיש מקצוע');
            return;
        }
        send({ func: authApi.register, data: { user, adminCode, foundationId } }).then(result => {
            if (result.ok) {
                setIsError(false);
                setMessage('ההרשמה בוצעה בהצלחה, הנך מועבר למסך הכניסה');
                window.setTimeout( ()=>{
                    nav('/login');
                }, 3000)
            }
        });
    }
    return (
        <div>
            <Message message={message} isError={isError} />
            {/* <Message message={"אירעה שגיאה במהלך הפעולה"} />
            <Message message={"הפעולה הסתיימה בהצלחה"} isError={false} /> */}
            <PageHead title="רישום למערכת" />
            <form onSubmit={handleSubmit}>
                <InputText id="fullName" value={user.fullName} label="שם מלא" placeholder="הקלידו את שמכם המלא" onChange={handleChange} />
                <InputText id="phone" value={user.phone} label="טלפון" placeholder="הקלידו את מספר הטלפון" onChange={handleChange} rtl={false} />
                <InputText id="email" type="email" value={user.email} label="אימייל" placeholder="הקלידו את כתובת האימייל שלכם" onChange={handleChange} rtl={false} />
                <InputText id="password" type="password" value={user.password} label="סיסמא" placeholder="הקלידו את הסיסמא" onChange={handleChange} rtl={false} />

                <div className='registration-code' >
                    <InputText id="isProfessional" name='isProfessional' checked={user.isProfessional} value={user.isProfessional} type="checkbox" label="איש מקצוע" onChange={handleIsProfessional} rtl={false} />
                    {user.isProfessional && <Select id='foundationId' onChange={handleFoundation} value={foundationId} label='עמותה' list={[{id:-1, name:'בחירת עמותה'}, ...foundations.map( f => ({id:f.foundationId, name:f.name}))]}/>}
                </div>
                <div className='registration-code' >
                    <InputText id="adminNoCode" name='adminCode' value="false" type="radio" label="אין לי קוד" checked={!hasAdminCode} onChange={handleHasAdminCode} rtl={false} />
                    <InputText id="adminhasCode" name='adminCode' value="true" type="radio" label="יש לי קוד" checked={hasAdminCode} onChange={handleHasAdminCode} rtl={false} />
                    {hasAdminCode && <InputText id="adminCode" value={adminCode} label="קוד" placeholder="הקלידו את הקוד" onChange={handleAdminCode} rtl={false} />}
                </div>
                {/* <label htmlFor="adminhasCode">יש לי קוד</label>
                <input type="radio" id="adminhasCode" name="adminCode" value="true" onChange={handleAdminCode}/>
                <label htmlFor="adminNoCode">אין לי קוד</label>
                <input type="radio" id="adminNoCode" name="adminCode" value="false" onChange={handleAdminCode}/> */}
                <button>רישום</button>
            </form>
        </div>
    )
}

export default Register;