import { useState, useEffect } from "react";
import RequestItem from "../components/request/RequestItem";


const UserRequests = () => {
    const [myRequests, setMyRequests] = useState([]);

    useEffect( () => {
        // load the user requests and save into myRequests
    }, [])
    return(
        <div>
            <h4> My Requests</h4>
            <div className='my-requests'>
                {myRequests.map( req => <RequestItem key={req.requestId} request={req} showStatus={true}/>)}
            </div>
        </div>
    )
}

export default UserRequests;