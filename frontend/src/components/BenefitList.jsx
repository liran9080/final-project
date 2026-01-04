
import BenefitItem from "./BenefitItem";
import '../css/BenefitList.css'

function BenefitList({ benefits, editBenefit, deleteBenefit }) {


    return (
        <div className="benefit-list">
            {
                benefits.map(benefit => <BenefitItem key={benefit.benefitId} benefit={benefit} editBenefit={editBenefit} deleteBenefit={deleteBenefit}/>)
            }
        </div>
    )
}

export default BenefitList;