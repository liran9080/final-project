
import { useContext } from 'react';
import '../css/BenefitItem.css'
import AuthContext from '../context/AuthContext';
import useToggle from '../hooks/useToggle';

function BenefitItem({benefit, editBenefit}){
    const {isAdmin} = useContext(AuthContext);
    const {isOn, toggle} = useToggle();
    
    return(
        <div className='benefit-item'>
            <h4>{benefit.title}</h4>
            <button onClick={toggle}>{isOn?'הצג פחות' : 'הצג יותר' }</button>
            {isOn && <p>{benefit.description}</p>}
            {isAdmin() && <button onClick={()=>editBenefit(benefit.benefitId)}>עדכון זכות</button>}
        </div>
    )
}

export default BenefitItem;
