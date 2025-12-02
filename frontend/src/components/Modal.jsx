import { useEffect, useRef } from 'react';
import '../css/Modal.css'
function Modal({ component, onClose, isOn }) {
    const modalContainer = useRef(null);

    const handleClick = (event) => {
        if (!modalContainer.current) return;
        if(!isOn)return;
        if (!modalContainer.current.contains(event.target)) {
            onClose();
        }
    }

    useEffect(() => {
        if(!isOn)return;

        document.body.addEventListener('click', handleClick, true);
        // window.setTimeout( () => {
        // }, 1000)

        return () => {
            document.body.removeEventListener('click', handleClick, true)
        }
    }, [isOn])
    if (!isOn) return null;
    
    return (
        <div className='modal' ref={modalContainer}>
            <div><span onClick={onClose} className='close'>X</span><>---</></div>
            {component}
        </div>
    )
}

export default Modal