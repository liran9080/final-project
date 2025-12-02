import express from 'express'
import controller from '../controllers/categories.controller.js'
const categoriesRoutes = express.Router()

const statistics = {
    '1':0, '2':0
}

const addStatistics = (req, res, next) =>{
    const { categoryId } = req.params;
    if(statistics[categoryId]){
        statistics[categoryId]++
    }else{
        statistics[categoryId] = 1
    }
    // console.log(statistics)
    next()
}


// categoriesRoutes.get('', (req, res) => {
//     // req: HTTP request
//     // res: HTTP response
//     res.json(arr)
// })

//http://127.0.0.1:5566/api/categories
//HTTP GET /api/categories 
categoriesRoutes.get('', controller.getCatgories)

//http://127.0.0.1:5566/api/categories/1 => req.params.categoryId = 1
categoriesRoutes.get('/:categoryId', addStatistics, controller.getCategory)

export default categoriesRoutes;