import { useState, useEffect } from "react";
import RequestItem from "../components/request/RequestItem";
import CreateMessage from '../components/chat/CreateMessage'


const ProfessionalRequests = () => {
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [pendingRequests, setPendingRequests] = useState(0);

    useEffect( () =>{
        // load number of pending requests and save into pendingRequests
    }, [])
    return (
        <div>
            <p> <span>{pendingRequests}</span> requetss pending</p>
            <button>get next assignment</button>
            {selectedRequest != null && <>
                <RequestItem />
                <CreateMessage />
            </>}
        </div>
    )
}

export default ProfessionalRequests;