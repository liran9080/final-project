import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BenefitList from "../components/BenefitList";
import FoundationList from "../components/FoundationList";
import PageHead from "../components/PageHead";
import Back from "../components/Back";

import categoryApi from "../api/categoryApi";
import benefitApi from "../api/benefitApi";
import foundationApi from "../api/foundationApi";

import useHttp from "../hooks/useHttp";
import useEdit from "../hooks/useEdit";
import Message from "../components/Message";
import AddFoundation from "../components/AddFoundation";
import Modal from "../components/Modal";
import AddBenefit from "../components/AddBenefit";

import useToggle from "../hooks/useToggle";
import { useCallback } from "react";
import EditBenefit from "../components/EditBenefit";
import EditFoundation from "../components/EditFoundation";
import AuthContext from "../context/AuthContext";
import { generalSort } from "../utils/sortUtil";
import useConfirm from '../hooks/useConfirm';
import Confirm from '../components/gui/Confirm';

function CategoryDetails() {
    const params = useParams();

    const { isAdmin } = useContext(AuthContext)


    const { send, message, setMessage, setIsError, loading, isError } = useHttp(true)
    const [category, setCategory] = useState(null);
    const [benefits, setBenefits] = useState([]);
    const [foundations, setFoundations] = useState([]);

    const { itemId: editBenefitId, editItem: editBenefit, closeEditItem: closeEditBenefit, deleteItem } = useEdit(send);
    const { itemId: editFoundationId, editItem: editFoundation, closeEditItem: closeEditFoundation, } = useEdit(send);

    const confirm = useConfirm();

    const { toggle: toggleFoundation, isOn: showFoundation } = useToggle();
    const { toggle: toggleBenefit, isOn: showBenefit } = useToggle();

    const loadData = async (categoryId) => {
        const categoryResult = await send({ func: categoryApi.getCategory, id: categoryId });

        if (categoryResult.ok) {
            setCategory(categoryResult.data);
        } else {
            return;
        }
        const benefitsResult = await send({ func: benefitApi.getBenefits, id: categoryId });
        if (benefitsResult.ok) {
            generalSort(benefitsResult.data, 'title')
            setBenefits(benefitsResult.data)
        }
        const foundationsResult = await send({ func: foundationApi.getFoundations, id: categoryId });
        if (foundationsResult.ok) {
            generalSort(foundationsResult.data, 'name')
            setFoundations(foundationsResult.data)
        }
    }

    useEffect(() => {
        if (params.categoryId) {
            loadData(params.categoryId)
        }
    }, [])


    // add\edit benefits
    const updateBenefits = useCallback((benefit) => {
        // const t = benefits.filter(b => b.benefitId != benefit.benefitId)
        // const t2 = [...t, benefit]
        setBenefits((currentBenefits) => {
            const tempArr = generalSort([...currentBenefits.filter(b => b.benefitId != benefit.benefitId), benefit], 'title')
            return tempArr;
        })
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
            setBenefits((currentBenefits) => {
                const tempArr = currentBenefits.filter(b => b.benefitId != confirm.subject.benefitId)
                return tempArr;
            })
        })
    }



    // add\edit foundations
    const updateFoundations = useCallback((foundation) => {
        setFoundations((currentFoundations) => {
            const tempArr = [...currentFoundations.filter(f => f.foundationId != foundation.foundationId), foundation];
            generalSort(tempArr, 'name')
            return tempArr;
        })
    }, [])


    if (loading === true) {
        return (<Spinner />)
    }
    // לחיצה על כפתור עדכון
    // להעביר את האיידי של הזכות לפונקציה
    // הפונקציה צריכה לאותת למודאל שיציג את טופס עדכן הזכות ולהעביר לו את הזכות
    return (
        <div>
            <Message message={message} isError={isError} />
            <div>
                <PageHead
                    left={<Back to={`/categories`} hint="חזרה לרשימת קטגוריות" />}
                    title={`זכויות בנושא ${category.name}`}
                    right={isAdmin() && <>
                        {/* <Link to={`/add-benefit/${category.id}`}><button>הוספת זכות</button></Link> */}
                        <button onClick={toggleBenefit}>+ זכות</button>
                        <button onClick={toggleFoundation}>+ עמותה</button>
                    </>} />

            </div>
            <Modal component={<Confirm question={confirm.prompt} onNo={confirm.hide} onYes={deleteBenefit} />} isOn={confirm.isVisible} onClose={confirm.hide} />
            <Modal component={<AddFoundation onSuccess={updateFoundations} />} onClose={toggleFoundation} isOn={showFoundation} />
            <Modal component={<AddBenefit onSuccess={updateBenefits} />} onClose={toggleBenefit} isOn={showBenefit} />

            <Modal component={<EditBenefit benefitId={editBenefitId} onClose={closeEditBenefit} postSave={updateBenefits} />} onClose={closeEditBenefit} isOn={editBenefitId > -1} />
            <Modal component={<EditFoundation foundationId={editFoundationId} onClose={closeEditFoundation} postSave={updateFoundations} />} onClose={closeEditFoundation} isOn={editFoundationId > -1} />
            <BenefitList benefits={benefits} editBenefit={editBenefit} deleteBenefit={confirmBenefitDelete} />
            <h4>רשימת עמותות {category.name}</h4>
            <FoundationList foundations={foundations} editFoundation={editFoundation} />
        </div>
    )
}

export default CategoryDetails;