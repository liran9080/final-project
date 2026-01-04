import '../../css/Confirm.css'
function Confirm({ question, onYes, onNo }) {

    if (!question) return null;
    return (
        <div className="confirm">
            <h4 className="error">{question}</h4>
            <div className='confirm-action'>
                <button onClick={onYes}>אישור</button>
                <button onClick={onNo}>ביטול</button>
            </div>
        </div>
    )
}

export default Confirm