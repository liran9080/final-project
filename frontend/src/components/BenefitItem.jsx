
import { useContext } from 'react';
import '../css/BenefitItem.css'
import AuthContext from '../context/AuthContext';
import useToggle from '../hooks/useToggle';

function BenefitItem({ benefit, editBenefit, deleteBenefit }) {
    const { isAdmin } = useContext(AuthContext);
    const { isOn, toggle } = useToggle();

    return (
        <div className='benefit-item'>
            <h4>{benefit.title}</h4>
            {isOn && <p>{benefit.description}</p>}
            <div>
                <button onClick={toggle}>{isOn ? 'הצג פחות' : 'הצג יותר'}</button>
                {isAdmin() && <button onClick={() => editBenefit(benefit.benefitId)}>עדכון זכות</button>}
                {isAdmin() && <button onClick={() => deleteBenefit(benefit)}>מחיקת זכות</button>}
            </div>
        </div>
    )
}

export default BenefitItem;
