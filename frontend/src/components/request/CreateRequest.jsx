import { useState, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';
import benefitApi from '../../api/benefitApi';
import Select from '../Select';
import { generalSort} from '../../utils/sortUtil'
import Textarea from '../Textarea';
import userRequestApi from '../../api/userRequestApi';
import PageHead from '../PageHead';
import Message from '../Message';
import Spinner from '../Spinner';

const CreateRequest = ({categoryId, foundationId}) => {
    const [benefits, setBenefits] = useState([]);
    const [userRequest, setUserRequest] = useState({userId:0, benefitId:-1, foundationId, details:'', status:'pending' })
    const { send, message, setMessage, setIsError, loading, isError } = useHttp(true)

    const handlechange = (event) =>{
        const {id, value} = event.target;
        setUserRequest({...userRequest, [id]: value})
    }
    const loadBenefits = async () => {
        const benefitsResult = await send({ func: benefitApi.getBenefits, id: categoryId });
        if (benefitsResult.ok) {
            generalSort(benefitsResult.data, 'title')
            setBenefits([{benefitId:-1, title:'בחרו זכות'},...benefitsResult.data])
        }
    }
    useEffect(() =>{
        loadBenefits();
    }, [])

    const handleSubmit = async (event) =>{
        event.preventDefault();
        if(userRequest.benefitId == -1){
            setIsError(true);
            setMessage('בחרו בזכות המתאימה לבקשה');           
            return;
        }
        if(userRequest.details.trim().length == 0){
            setIsError(true);
            setMessage('הקלידו את פרטי הבקשה    ');  
            return;
        }
        const result = await send({ func: userRequestApi.addUserRequest, data:userRequest });
        if(result.ok){
            setIsError(false);
            setMessage('הבקשה נשלחה בהצלחה');
        }
    }
    if (loading) {
        return <Spinner />
    }
    return (
        <form onSubmit={handleSubmit}>
            <PageHead title='שליחת בקשה לעמותה' />
            <Message message={message} isError={isError} />
            <Select id='benefitId' onChange={handlechange} value={userRequest.benefitId} label='זכויות' list={benefits.map( b => ({id:b.benefitId, name:b.title}))}/>
            <Textarea id='details' label='פרטי הבקשה' onChange={handlechange} value={userRequest.details}/>                
            <button>send request</button>
        </form>
    )

}

export default CreateRequest