import {isoDateToDisplay} from '../../utils/dateUtil'

import '../../css/requestItem.css';

const RequestItem = ({request, showStatus=false, accept=()=>{}, isProfessional}) => {

    return(
        <div className='request-item'>
            <p>תאריך: {isoDateToDisplay(request.createdAt)}</p>
            <p>פרטי מבקש:{request.userId}</p>
            <p> זכות{request.benefitId}</p>
            <p>{request.details}</p>
            {showStatus && <p>status</p>}
            {isProfessional && <button onClick={() => accept(request)}>קבלת בקשה</button>}
        </div>
    )
}

export default RequestItem;