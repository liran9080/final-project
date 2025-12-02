import {  useState } from "react"
import InputText from "../components/InputText"
import Select from "../components/Select"
import searchApi from '../api/searchApi'
import useHttp from "../hooks/useHttp";
import BenefitList from "../components/BenefitList";
import FoundationList from "../components/FoundationList";

import '../css/Search.css'
import Spinner from "../components/Spinner";
import Message from "../components/Message";

const geoArr = ['כל הארץ', 'צפון', 'דרום', 'מרכז', 'ירושלים']

// const myInput = document.getElementById("myInput")
// <input type="text" id="myInput"/>
function Search(){
    const [result, setResult] = useState({benefits:[], foundations:[]})
    const [searchText, setSearchText] = useState("")
    const [searchGeo, setSearchGeo] = useState("")
    
    const {send, message, loading, isError, setMessage, setIsError} = useHttp()

    const onSearch = () =>{
        if(searchText.length < 2){
            setIsError(true)
            setMessage('חיפוש חייב להכיל לפחות 2 אותיות')
            return;
        }

        //queryString
        // http://127.0.0.1:5566/api/search?q=fgvfgdfgsfd
        const query=`q=${searchText}&geo=${searchGeo}`
        send({func: searchApi.searchText, data:query}).then(result => {
            if(result.ok){
                console.log(result.data,);
                setResult(result.data);
            }
        })        

    }

    if(loading) return <Spinner/>
    return(
        <div>
            <Message message={message} isError={isError}/>
            <div className="search-bar">
                <InputText id="searchext" label="חפש לפי טקסט" type="text" value={searchText} onChange={(event)=>setSearchText(event.target.value)}/>
                <Select id="searchgeo" label="מיקום" list={geoArr.map(e => ({id:e, name:e}))} value={searchGeo} onChange={(event) => setSearchGeo(event.target.value)}/>
                <button onClick={onSearch}>חפש</button>
            </div>
            <p>זכויות</p>
            <BenefitList benefits={result.benefits}/>
            <p>עמותות</p>
            <FoundationList foundations={result.foundations}/>
        </div>
    )
}

export default Search