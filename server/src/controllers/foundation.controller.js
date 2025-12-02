import AppError from '../errors/appError.js';
import foundationService from '../services/foundation.service.js'

//isCategoryExists(benefit.categoryId)

const getFoundation = async (req, res) => {
    const { foundationId } = req.params;

    const foundation = await foundationService.getFoundation(foundationId);

    if (foundation) {
        res.json(foundation);
    } else {
        res.status(404).json({ message: `foundation ${foundationId} not found` });
    }
}

const getFoundationsByCategory = async (req, res) => {
    const { categoryId } = req.params;

    const foundations = await foundationService.getFoundationsByCategory(categoryId)

    res.json(foundations);
}

const addFoundation = async (req, res) => {
    const foundation = req.body
    try { // מוודאים שהמשתמש אדמין

        const createdFoundation = await foundationService.addFoundation(foundation)
        res.status(201).json(createdFoundation)
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}

const updateFoundation = async (req, res) => {
    const { foundationId } = req.params;
    const foundation = req.body

    try {
        if (+foundationId !== foundation.foundationId) {
            throw new AppError(`incorrect foundationId ${foundationId}`, 400)
        }

        const updatedFoundation = await foundationService.updateFoundation(foundationId, foundation)

        res.status(200).json(updatedFoundation)
    } catch (error) {
        // if field httpCode exists in error - send it, otherwise send 500
        res.status(error.httpCode || 500).send({ message: error.message })
    }
}

const deleteFoundation = async (req, res) => {
    const { foundationId } = req.params;

    try {
        await foundationService.deleteFoundation(foundationId)

        res.json({ message: `Foundation ${data.db.foundations[foundationIndex].name} was inactivated successfully` })
    } catch (error) {
        res.status(error.httpCode || 500).send({ message: error.message })
    }

}

const getAreas = (req, res) => {
    const areas = foundationService.getAreas()
    res.json(areas)
}
export default { getFoundationsByCategory, addFoundation, getFoundation, deleteFoundation, updateFoundation, getAreas }