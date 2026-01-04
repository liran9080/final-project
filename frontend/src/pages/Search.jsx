import { useState, useCallback } from "react"
import InputText from "../components/InputText"
import Select from "../components/Select"
import searchApi from '../api/searchApi'
import useHttp from "../hooks/useHttp";
import BenefitList from "../components/BenefitList";
import FoundationList from "../components/FoundationList";
import EditBenefit from "../components/EditBenefit";
import EditFoundation from "../components/EditFoundation";
import Modal from "../components/Modal";
import benefitApi from "../api/benefitApi";

import Spinner from "../components/Spinner";
import Message from "../components/Message";

import { generalSort } from "../utils/sortUtil";
import useConfirm from '../hooks/useConfirm';
import Confirm from '../components/gui/Confirm';
import useEdit from "../hooks/useEdit";

import '../css/Search.css'

const geoArr = ['כל הארץ', 'צפון', 'דרום', 'מרכז', 'ירושלים']


function Search() {
    const [result, setResult] = useState({ benefits: [], foundations: [] })
    const [searchText, setSearchText] = useState("")
    const [searchGeo, setSearchGeo] = useState("")

    const confirm = useConfirm();
    const { send, message, loading, isError, setMessage, setIsError } = useHttp()
    const { itemId: editBenefitId, editItem: editBenefit, closeEditItem: closeEditBenefit, deleteItem } = useEdit(send);
    const { itemId: editFoundationId, editItem: editFoundation, closeEditItem: closeEditFoundation, } = useEdit(send);


    const onSearch = () => {
        if (searchText.length < 2) {
            setIsError(true)
            setMessage('חיפוש חייב להכיל לפחות 2 אותיות')
            return;
        }

        //queryString
        // http://127.0.0.1:5566/api/search?q=fgvfgdfgsfd
        const query = `q=${searchText}&geo=${searchGeo}`
        send({ func: searchApi.searchText, data: query }).then(result => {
            if (result.ok) {
                console.log(result.data,);
                const benefits = generalSort(result.data.benefits, 'title')
                const foundations =  generalSort(result.data.foundations, 'name')
                setResult({benefits, foundations});
            }
        })

    }

    // update 
    const updateBenefits = useCallback((benefit) => {
        setResult(result => {
            const benefits = generalSort([...result.benefits.filter(b => b.benefitId != benefit.benefitId), benefit], 'title')
            return { ...result, benefits }
        })
            setIsError(false);
            setMessage("הזכות עודכנה בהצלחה")
    }, [])

    const confirmBenefitDelete = (benefit) => {
        confirm.setSubject(benefit)
        confirm.setPrompt(`האם למחוק את הזכות ${benefit.title}`)
        confirm.show();
    }
    const deleteBenefit = async () => {
        deleteItem(confirm.subject.benefitId, benefitApi.deleteBenefit, (deleteResult) => {
            console.log(deleteResult.data);
            confirm.hide()
            setIsError(false);
            setMessage(deleteResult.data.message)
            // מחיקת הזכות מרשימת הזכויות
            setResult(result => {
                const benefits = generalSort(result.benefits.filter(b => b.benefitId != confirm.subject.benefitId), 'title')
                return { ...result, benefits }
            })
        })
    }


    // add\edit foundations
    const updateFoundations = useCallback((foundation) => {
        setResult((currentData) => {
            const temp = { benefits: currentData.benefits }
            temp.foundations = generalSort([...currentData.foundations.filter(f => f.foundationId != foundation.foundationId), foundation]);
            return temp;
        })
    }, [])


    if (loading) return <Spinner />
    return (
        <div >
            <Modal component={<Confirm question={confirm.prompt} onNo={confirm.hide} onYes={deleteBenefit} />} isOn={confirm.isVisible} onClose={confirm.hide} />
            <Modal component={<EditBenefit benefitId={editBenefitId} onClose={closeEditBenefit} postSave={updateBenefits} />} onClose={closeEditBenefit} isOn={editBenefitId > -1} />
            <Modal component={<EditFoundation foundationId={editFoundationId} onClose={closeEditFoundation} postSave={updateFoundations} />} onClose={closeEditFoundation} isOn={editFoundationId > -1} />
            <Message message={message} isError={isError} />
            <div className="search-bar">
                <InputText id="searchext" label="חפש לפי טקסט" type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
                <Select id="searchgeo" label="מיקום" list={geoArr.map(e => ({ id: e, name: e }))} value={searchGeo} onChange={(event) => setSearchGeo(event.target.value)} />
                <button onClick={onSearch}>חפש</button>
            </div>
            <p className='search-result_title'>זכויות</p>
            {result.benefits.length > 0 && <BenefitList benefits={result.benefits} editBenefit={editBenefit} deleteBenefit={confirmBenefitDelete} />}
            <p className='search-result_title'>עמותות</p>
            {result.foundations.length > 0 && <FoundationList foundations={result.foundations} editFoundation={editFoundation} />}
        </div>
    )
}

export default Search