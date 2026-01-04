import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageHead from "./PageHead";
import InputText from "./InputText";
import Textarea from "./Textarea";
import Select from "./Select";

import foundationApi from "../api/foundationApi";
import categoryApi from "../api/categoryApi";
import useHttp from "../hooks/useHttp";
import Message from "./Message";
import useToggle from "../hooks/useToggle";
import Spinner from "./Spinner";

function AddFoundation({onSuccess}) {
    const params = useParams()
    const {isOn, toggle} = useToggle();
    const {send, message, loading, isError, setMessage, setIsError} = useHttp(true)
    const [foundation, setFoundation] = useState({ categoryId: 1, name: '', area: '', address: '', phone: '', email: '', description: '' })
    const [areas, setAreas] = useState([])
    const [categories, setCategories] = useState([])

    const loadAreas = () => {
        send({func:foundationApi.getFoundationAreas}).then(result => {
            if(result.ok){
                setAreas(result.data)
            }
        })
    }
    const loadCategories = () => {
        send({func:categoryApi.getCategories}).then(result => {
            if(result.ok){
                setCategories(result.data)
            }
        })
    }
    useEffect(() => {
        loadAreas();
        loadCategories();
        if (params.categoryId) {
            console.log('params.categoryId', params.categoryId);
            
            setFoundation({ ...foundation, categoryId: params.categoryId })
        }
    }, [params])


    const handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setFoundation({ ...foundation, [id]: value })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if(isOn)return;
        send({func:foundationApi.addFoundation, data:foundation}).then(result => {
            if(result.ok){
                setIsError(false)
                setMessage('העמותה התווספה בהצלחה')
                toggle();
                setTimeout( () => {
                    onSuccess(result.data)
                }, 3000)
            }
        })
    }
    if(loading){
        return <Spinner/>
    }
    return (
        <div>
            
            <PageHead title='הוספת עמותה' />
            <Message message={message} isError={isError} />
            <form onSubmit={handleSubmit}>
                <Select id="categoryId" label="נושא" onChange={handleChange} value={foundation.categoryId} list={categories.map(c => ({id:c.categoryId, name:c.name}))}/>
                <InputText id="name" label="שם"  placeholder="שם העמותה" value={foundation.name} onChange={handleChange}/>
                <Select id="area" label="איזור" onChange={handleChange} value={foundation.area} list={areas}/>
                <InputText id="address" label="כתובת"  placeholder="כתובת העמותה" value={foundation.address} onChange={handleChange}/>
                <InputText id="phone" label="טלפון"  placeholder="טלפון העמותה" value={foundation.phone} onChange={handleChange}/>
                <InputText type="email" id="email" label="אימייל"  placeholder="אימייל העמותה" value={foundation.email} onChange={handleChange}/>
                <Textarea id="description" label="תיאור"  placeholder="תיאור העמותה" value={foundation.description} onChange={handleChange}/>
                {!isOn && <button>שמירה</button>}
            </form>
        </div>
    )
}

export default AddFoundation;