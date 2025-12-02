
import FoundationItem from "./FoundationItem";
import '../css/FoundationList.css'

function FoundationList({ foundations, editFoundation }) {


    return (
        <div className="foundation-list">
            {
                foundations.map(foundation => <FoundationItem key={foundation.foundationId} foundation={foundation} editFoundation={editFoundation} />)
            }
        </div>
    )
}

export default FoundationList;