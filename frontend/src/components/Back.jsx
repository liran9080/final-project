import { Link } from "react-router-dom"
function Back({to, hint="", sign=">"}){

    return (
        <Link to={to} title={hint}>{sign} חזרה</Link>
    )
}

export default Back