
import models from '../models/index.js'
import AppError from '../errors/appError.js'

export const initcategories = async () => {
    const categories = await getCatgories();
    if (categories.length == 0) {
        await models.Category.create({ name: 'בריאות' })
        await models.Category.create({ name: 'דיור' })
        await models.Category.create({ name: 'השכלה' })
        await models.Category.create({ name: 'תעסוקה' })
        await models.Category.create({ name: 'חברה ושעות פנאי' })
    }
}


const getCatgories = async () => {
    // req: HTTP request
    // res: HTTP response
    const categories = await models.Category.findAll()

    return categories
}

const getCategory = async (categoryId) => {
    const category = await models.Category.findByPk(categoryId)
    return category;
}


export const isCategoryExists = async (categoryId) => {
    const category = await models.Category.findByPk(categoryId)
    if (!category) {
        throw new AppError(`invalid category id ${categoryId}`, 400)
    } else {
        return true;
    }
}


export default { getCatgories, getCategory }