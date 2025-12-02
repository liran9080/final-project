import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import InputText from "../components/InputText";
import Textarea from "../components/Textarea";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import benefitApi from "../api/benefitApi";
import useHttp from "../hooks/useHttp";
import Back from "../components/Back";
import PageHead from "../components/PageHead";

function EditBenefit({benefitId, onClose, postSave}) {

    const {send, message, loading, isError} = useHttp()
    const [benefit, setBenefit] = useState({title:'',description:'', categoryId:0})
    
    
    const loadBenefit = async() => {
        const benefitResult = await send({ func: benefitApi.getBenefit, id: benefitId });
        if (benefitResult.ok)
            setBenefit(benefitResult.data)   
    }

    useEffect(() => {        
        loadBenefit()
    }, [])
    
    const handleChange = (event) =>{
        const id = event.target.id;
        const value = event.target.value;
        setBenefit({...benefit, [id]:value})
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();    
        console.log(benefit);
        
        send({func: benefitApi.updateBenefit, id:benefit.benefitId, data:benefit}).then(result => {
            if(result.ok){
                onClose()
                postSave(result.data)
            }
        })
    }
    if (loading) {
        return <Spinner />
    }
    
    return (
        <div>
            <PageHead title='עדכון זכות' />
            <Message message={message} isError={isError} />
            <form onSubmit={handleSubmit}>
                <InputText id="title" value={benefit.title} label="זכות" placeholder="כותרת הזכות" onChange={handleChange} />
                <Textarea id="description" value={benefit.description} label="תיאור" placeholder="תיאור הזכות" onChange={handleChange} />
                <button disabled={isError}>שמירה</button>
            </form>
        </div>
    )
}

export default EditBenefit;