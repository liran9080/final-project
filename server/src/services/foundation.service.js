import AppError from '../errors/appError.js';
import models from '../models/index.js';
import { Op } from 'sequelize'
const { Foundation } = models
import { isCategoryExists } from './categories.service.js';

const getFoundation = async (foundationId) => {
    const foundation = await Foundation.findByPk(foundationId)

    return foundation
}

const getFoundationsByCategory = async (categoryId) => {
    const foundations = await Foundation.findAll({
        where: {
            categoryId: categoryId
        }
    })

    return foundations;
}

const addFoundation = async (foundation) => {

    // מוודאים שהקטגוריה קיימת
    isCategoryExists(foundation.categoryId)
    const cretedFoundation = await Foundation.create(foundation);
    return cretedFoundation
}

const updateFoundation = async (foundationId, foundation) => {

    // מוודאים שהקטגוריה קיימת
    await isCategoryExists(foundation.categoryId)

    const existingFoundation = await Foundation.findByPk(foundationId)

    if (!existingFoundation) {
        throw new AppError(`foundation ${foundationId} does not exist`, 400)
    }

    //existingFoundation.set("name", foundation.name)
    existingFoundation.name = foundation.name
    existingFoundation.area = foundation.area
    existingFoundation.address = foundation.address
    existingFoundation.phone = foundation.phone
    existingFoundation.email = foundation.email
    existingFoundation.description = foundation.description
    const updateFoundation = await existingFoundation.save()
    return updateFoundation;
}

const deleteFoundation = async (foundationId) => {

    const existingFoundation = await Foundation.findByPk(foundationId)

    if (!existingFoundation) {
        throw new AppError(`foundation ${foundationId} does not exist`, 400)
    }

    // לא מוחקים עמותה אלא מסמנים אותה כלא פעילה
    // אחרת צריך למחוק גם את כל התגובות אליה
    existingFoundation.isActive = false;
    await existingFoundation.save()

}

const getAreas = () => {
    return ["צפון", "דרום", "מרכז", "ירושלים"].map(a => ({ id: a, name: a }))
}

const searchFoundations = async (text, area) => {
    let areaPredicate = {};
    if(getAreas().find(a => a.id == area )){
        areaPredicate = { area: area }
    }
    const results = await Foundation.findAll({
        where: {
            [Op.or]: [
                {[Op.and]:[{ name: { [Op.like]: `%${text}%` } },areaPredicate]},
                {[Op.and]:[{ description: { [Op.like]: `%${text}%` }} , areaPredicate]},
                
            ]
        }
    })
    return results;
}

export default { getFoundation, getFoundationsByCategory, addFoundation, updateFoundation, deleteFoundation, getAreas, searchFoundations }