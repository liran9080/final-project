

const RequestItem = ({request, showStatus=false}) => {

    return(
        <div>
            <p>user details</p>
            <p>right</p>
            <p>details</p>
            {showStatus && <p>status</p>}
        </div>
    )
}

export default RequestItem;