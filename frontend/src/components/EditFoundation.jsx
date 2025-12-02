import { useState, useEffect } from "react";
import PageHead from "./PageHead";
import InputText from "./InputText";
import Textarea from "./Textarea";
import Select from "./Select";
import foundationApi from "../api/foundationApi";
import categoryApi from "../api/categoryApi";
import useHttp from "../hooks/useHttp";
import Message from "./Message";
import Spinner from "./Spinner";

function EditFoundation({foundationId, onClose, postSave}) {

    const {send, message, loading, isError} = useHttp(true)
    const [foundation, setFoundation] = useState({ categoryId: 1, name: 'עלה', area: 'צפון', address: 'השלוש 2, תל אביב', phone: '031234567', email: 'aleh@mail.com', description: 'תיאור' })
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

    const loadFoundation = async() => {
        const foundationResult = await send({ func: foundationApi.getFoundation, id: foundationId });
        console.log('foundationResult', foundationResult);
        
        if (foundationResult.ok)
            setFoundation(foundationResult.data)   
    }

    useEffect(() => {
        loadAreas();
        loadCategories();
        loadFoundation();
    }, [])


    const handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setFoundation({ ...foundation, [id]: value })
    }
    const handleSubmit = (event) => {
        event.preventDefault();                
        send({func: foundationApi.updateFoundation, id:foundation.foundationId, data:foundation}).then(result => {
            if(result.ok){
                onClose()
                postSave(result.data)
            }
        })
    }
    if(loading){
        return <Spinner/>
    }
    return (
        <div>
            
            <PageHead title='עדכון עמותה' />
            <Message message={message} isError={isError} />
            <form onSubmit={handleSubmit}>
                <Select id="categoryId" label="נושא" value={foundation.categoryId} onChange={handleChange} list={categories.map(c => ({id:c.categoryId, name:c.name}))}/>
                <InputText id="name" label="שם"  placeholder="שם העמותה" value={foundation.name} onChange={handleChange}/>
                <Select id="area" label="איזור" value={foundation.area} onChange={handleChange} list={areas}/>
                <InputText id="address" label="כתובת"  placeholder="כתובת העמותה" value={foundation.address} onChange={handleChange}/>
                <InputText id="phone" label="טלפון"  placeholder="טלפון העמותה" value={foundation.phone} onChange={handleChange}/>
                <InputText type="email" id="email" label="אימייל"  placeholder="אימייל העמותה" value={foundation.email} onChange={handleChange}/>
                <Textarea id="description" label="תיאור"  placeholder="תיאור העמותה" value={foundation.description} onChange={handleChange}/>
                <button>שמירה</button>
            </form>
        </div>
    )
}

export default EditFoundation;