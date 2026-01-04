import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import InputText from "../components/InputText";
import Textarea from "../components/Textarea";
import Message from "../components/Message";
import Spinner from "../components/Spinner";
import benefitApi from "../api/benefitApi";
import useHttp from "../hooks/useHttp";
import useToggle from "../hooks/useToggle";
import PageHead from "../components/PageHead";

function AddBenefit({ onSuccess }) {
    const {toggle, isOn} = useToggle()
    const params = useParams();
    const { send, message, loading, isError, setIsError, setMessage } = useHttp()
    const [benefit, setBenefit] = useState({ title: '', description: '', categoryId: 0 })

    useEffect(() => {
        if (params.categoryId) {
            setBenefit({ ...benefit, categoryId: params.categoryId })
        }
    }, [params])

    const handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setBenefit({ ...benefit, [id]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isOn)return;
        console.log(benefit);

        send({ func: benefitApi.addBenefit, data: benefit, }).then(result => {
            if (result.ok) {
                setIsError(false)
                setMessage('הזכות התווספה בהצלחה')
                toggle();
                setTimeout(() => {
                    onSuccess(result.data)
                }, 3000)
            }
        })
    }
    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            <PageHead title='הוספת זכות' />
            <Message message={message} isError={isError} />
            <form onSubmit={handleSubmit}>
                <InputText id="title" label="זכות" placeholder="כותרת הזכות" value={benefit.title} onChange={handleChange} />
                <Textarea id="description" label="תיאור" placeholder="תיאור הזכות" value={benefit.description} onChange={handleChange} />
                {!isOn && <button>שמירה</button>}
            </form>
        </div>
    )
}

export default AddBenefit;