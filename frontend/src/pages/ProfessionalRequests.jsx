import { useState, useEffect, useContext } from "react";
import RequestItem from "../components/request/RequestItem";
import CreateMessage from '../components/chat/CreateMessage';
import professionalRequestApi from "../api/professionalRequestApi";
import useHttp from "../hooks/useHttp";
import AuthContext from "../context/AuthContext";


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
            console.log(result);
        } else {
            console.log("not a professional");

        }


    }
    useEffect(() => {
        // load number of pending requests and save into pendingRequests
        loadPendingRequests()
    }, [])
    return (
        <div>
            <p> <span>{pendingRequests.length}</span> בקשות ממתינות</p>
            <button>get next assignment</button>
            {selectedRequest != null && <>
                <RequestItem />
                <CreateMessage />
            </>}
        </div>
    )
}

export default ProfessionalRequests;