import {isoDateToDisplay} from '../../utils/dateUtil'

import '../../css/requestItem.css';

const RequestItem = ({request, showStatus=false, accept=()=>{}, isProfessional}) => {

    return(
        <div className='request-item'>
            <p>תאריך: <span style={{direction:'ltr', display: 'inline-block'}}>{isoDateToDisplay(request.createdAt)}</span></p>
            <p>פרטי מבקש: {request.requestUser.fullName}</p>
            <p>זכות: {request.requestBenefit.title}</p>
            <p>{request.details}</p>
            {showStatus && <p>{request.status}</p>}
            {isProfessional && request.status == 'pending' && <button onClick={() => accept(request)}>קבלת בקשה</button>}
        </div>
    )
}

export default RequestItem;