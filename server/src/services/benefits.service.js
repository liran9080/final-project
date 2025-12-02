import AppError from '../errors/appError.js'
import { Op } from 'sequelize'
import models from '../models/index.js'
import { isCategoryExists } from './categories.service.js'

const { Benefit } = models

const getBenefit = async (benefitId) => {
    // מחפש את הזכות לפי ID בכל הקטגוריות
    const benefit = await Benefit.findByPk(benefitId)
    return benefit
}

// http://127.0.0.1:5566/api/benefits?categoryId=2
// querystring: categoryId=2  
// parameter: category, value:2 
const getBenefits = async (categoryId) => {

    try { // מוודאים שהקטגוריה קיימת
        isCategoryExists(categoryId)

        // מחפש את הזכות לפי ID בכל הקטגוריות
        const benefits = await Benefit.findAll({ where: { categoryId: categoryId } })

        return benefits;
    } catch (error) {
        if(error.httpCode){
            throw error
        }
        throw new AppError("database error " + error.message, 500)
    }
}

const addBenefit = async (benefit) => {

    try {// מוודאים שהקטגוריה קיימת    
        isCategoryExists(benefit.categoryId)

        const createdBenefit = await Benefit.create(benefit)

        return createdBenefit;
    } catch (error) {
        if(error.httpCode){
            throw error
        }
        throw new AppError("database error " + error.message, 500)
    }
}

const updateBenefit = async(benefitId, benefit) => {
    
    try {// מוודאים שהקטגוריה קיימת
        isCategoryExists(benefit.categoryId)

        const existingBenefit = await Benefit.findByPk(benefitId)

        if(!existingBenefit){
            throw new AppError("invalid benefit", 400)
        }

        existingBenefit.title = benefit.title;
        existingBenefit.description = benefit.description;
        
        const updatedBenefit = await existingBenefit.save()
        return updatedBenefit;
    } catch (error) {
        if(error.httpCode){
            throw error
        }
        throw new AppError("database error " + error.message, 500)
    }
}

const searchBenefits = async (text, area) => {
    const results = await Benefit.findAll({
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${text}%` } },
                { description: { [Op.like]: `%${text}%` } },
            ]
        }
    })
    return results;
}



export default { getBenefit, getBenefits, addBenefit, updateBenefit, searchBenefits }