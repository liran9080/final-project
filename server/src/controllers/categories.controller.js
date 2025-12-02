import service from '../services/categories.service.js'
const getCatgories = async (req, res) => {
    // req: HTTP request
    // res: HTTP response
    const categories = await service.getCatgories()

    res.send(categories)
}


const getCategory = async (req, res) => {
    const { categoryId } = req.params;
    const category = await service.getCategory(categoryId)

    if (category) {
        res.json(category)
    } else {
        res.status(404).json({ message: `category ${categoryId} not found` })
    }
}
export default { getCatgories, getCategory }