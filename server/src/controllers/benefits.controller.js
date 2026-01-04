import service from '../services/benefits.service.js';
import messageMapping from '../config/messageMapping.json' with {type: 'json'}

const getBenefit = async (req, res) => {
    const { benefitId } = req.params;

    try {
        const benefit = await service.getBenefit(benefitId)
        if (benefit) {
            res.json(benefit);
        } else {
            res.status(404).json({ message: `benefit ${benefitId} not found` });
        }
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}

const getBenefits = async (req, res) => {
    const { categoryId } = req.query;

    try { 

        const benefits = await service.getBenefits(categoryId)
        console.log(`\x1b[33m benefits [${benefits}] 1.\x1b[0m`);
        
        res.json(benefits);
    } catch (error) {
        res.status(error.httpCode || 500).json({ message: error.message })
    }
}

const addBenefit = async (req, res) => {
    const benefit = req.body    // {categoryId: 1  title: 'זכות ג', description:'פרטי הזכות בריאות ורשימת נותני שירות' },

    try {
        const createdBenefit = await service.addBenefit(benefit)

        res.status(201).json(createdBenefit)
    } catch (error) {
        res.status(error.httpCode || 500).json({ message: error.message })
    }
}

const updateBenefit = async(req, res) => {
    const { benefitId } = req.params;
    const benefit = req.body    // {categoryId: 1  title: 'זכות ג', description:'פרטי הזכות בריאות ורשימת נותני שירות' },

    try {
        const updatedBenefit = await service.updateBenefit(benefitId, benefit)
       
        res.status(200).json(updatedBenefit)
    } catch (error) {
        res.status(error.httpCode || 500).json({ message: error.message })
    }
}

const deleteBenefit = async(req, res) => {
    const { benefitId } = req.params;
    try{
        await service.deleteBenefit(benefitId)
        res.send({message:messageMapping.benefit.deleted_ok})
    }catch(error){
        res.status(error.httpCode || 500).json({ message: error.message })
    }
}
export default {getBenefit, getBenefits, addBenefit, updateBenefit, deleteBenefit}