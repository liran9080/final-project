import { useState } from "react";

function useToggle(){
    const [isOn, setIsOn] = useState(false)
    const toggle = () => setIsOn( currentvalue =>!currentvalue)

    return {toggle, isOn}
}

export default useToggle;