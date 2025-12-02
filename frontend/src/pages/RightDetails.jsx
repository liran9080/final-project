import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

function RightDetails() {
    const params = useParams()
    const [selectedRight, setSelectedRight] = useState(null)

    const loadRight = async () => {
        const result = await fetch('http://127.0.0.1:5566/api/categories')
        if (result.status >= 400) {
            return;
        }
        const arr = await result.json()    // ממיר ג׳ייסון לאובייקט
        
        setTimeout(() => {
            for (const cat of arr) {
                for (const right of cat.rights) {
                    if (right.id == params.id) {
                        setTimeout(() => {
                            setSelectedRight(right)
                        }, 3000)
                        return;
                    }
                }
            }
        }, 2000)
    }

    useEffect(() => {
        if (params.id) {
            loadRight()
        }
    }, [])  // מערך תלויות

    if (selectedRight == null) {
        return (<Spinner />)
    }
    return (
        <div>
            <p>{params.id}</p>
            <h4>{selectedRight.title}</h4>
            <p>{selectedRight.description}</p>
        </div>
    )
}

export default RightDetails;