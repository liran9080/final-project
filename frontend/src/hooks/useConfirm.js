import {useState} from 'react'

const useConfirm = () =>{
    const [isVisible, setIsVisible] = useState(false);
    const [subject, setSubject] = useState(null)
    const [prompt, setPrompt] = useState('')

    const show = () => setIsVisible(true);
    const hide = () => setIsVisible(false);
    const reset = () => {
        hide();
        setPrompt("");
        setSubject(null);
        setPrompt
    }
    return {reset, isVisible, show, hide, subject, setSubject, prompt, setPrompt}
}

export default useConfirm;