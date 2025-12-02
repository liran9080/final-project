import { useState } from "react"
function useHttp(spinner=false) {
    const [loading, setLoading] = useState(spinner)
    const [message, setMessage] = useState(null)
    const [isError, setIsError] = useState(false)

    const send = async ({ func, id, data }) => {
        try {
            setLoading(true)
            setIsError(false)
            setMessage(null)

            //token קריאת ה 
            let token;
            const jsonAuthData = sessionStorage.getItem('auth');
            if (jsonAuthData) {
                const auth = JSON.parse(jsonAuthData)
                token = auth.token
            }

            const response = await func({ token, id, data })
            const textResponse = await response.text()
            let result;
            if(textResponse && textResponse.length > 0){
                // ממיר ג׳ייסון לאובייקט 
                result = JSON.parse(textResponse)
            }
            
            if(response.status >= 200 && response.status < 300){
                return {data:result, ok:true}
            }else{
                setIsError(true)
                setMessage(result.message)
                return {ok:false}
            }
        } catch (error) {
            setIsError(true)
            console.log(error.name, error.message);
            if(error.message.includes("Failed to fetch")){
                setMessage("השרת אינו זמין כעת")    
            }else{
                setMessage("אירעה שגיאה בשרת")
            }
            return {ok:false}
        }finally{
            setTimeout(() => {
                setLoading(false)
            }, 1000)
            
        }

    }

    return {loading, message, setMessage, send, isError, setIsError}
}

export default useHttp