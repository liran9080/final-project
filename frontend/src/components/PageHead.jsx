import Back from "./Back";
import '../css/PageHead.css'

function PageHead({left, title, right}){

    return(
        <div className="page-head">
            <div className="col col-right">{right}</div>
            <div className="col col-center">{title}</div>
            <div className="col col-left">{left}</div>
        </div>
    )
}

export default PageHead;