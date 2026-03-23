import { useState, useEffect, useContext } from "react";
import RequestItem from "../components/request/RequestItem";
import CreateMessage from '../components/chat/CreateMessage';
import professionalRequestApi from "../api/professionalRequestApi";
import useHttp from "../hooks/useHttp";
import AuthContext from "../context/AuthContext";
import Message from '../components/Message'


const ProfessionalRequests = () => {
    const { authData } = useContext(AuthContext)
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [pendingRequests, setPendingRequests] = useState([]);

    const { send, message, loading, isError } = useHttp();

    // להחזיר את מספר הבקשות לעמותה לה שייך איש המקצוע
    const loadPendingRequests = async () => {
        if (authData && authData.foundationId > -1) {
            const result = await send({
                 func: professionalRequestApi.getUserRequestByFoundation, 
                 id: authData.foundationId 
                });
            if (result.ok)
                setPendingRequests(result.data)
        }
    }
    const acceptRequest = async (request) => {
        const data = {assignment:{userId: request.userId, professionalId:authData.user.userId, userRequestId: 0}, status:'done'}
        const result = await send({
                 func: professionalRequestApi.acceptRequests, 
                 id: request.userRequestId,
                 data:data
                });
            if (result.ok)
                setPendingRequests(result.data)
    }
    useEffect(() => {
        // load number of pending requests and save into pendingRequests
        loadPendingRequests()
    }, [])
    return (
        <div>
            <Message message={message} isError={isError} />
            <p> <span>{pendingRequests.length}</span> בקשות ממתינות</p>
            
            <div style={{display:'flex', flexWrap:'wrap '}}>
                {
                pendingRequests.map( pr => <RequestItem key={pr.userRequestId} request={pr} accept={acceptRequest} isProfessional={true}/>)
                }
            </div>
            
            {selectedRequest != null && <>
                <RequestItem />
                <CreateMessage />
            </>}
        </div>
    )
}

export default ProfessionalRequests;