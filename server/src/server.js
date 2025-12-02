import express from 'express'
import cors from 'cors'


import categoriesRoutes from './routes/category.routes.js'
import benefitRoutes from './routes/benefit.routes.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import commentRoutes from './routes/comment.routes.js'
import foundationRoutes from './routes/foundation.routes.js'
import searchRouter from './routes/search.routes.js'

import tokenService from './middleware/token.service.js'


import models, {sequelize} from './models/index.js'
import {initcategories} from './services/categories.service.js'


const PORT = 5566
const app = express();


app.use(cors())
app.use(express.json())

// http verbs: get, post, put, patch, delete, option
//http://127.0.0.1:5566 /api/foundations/1
app.use('/api/auth', authRoutes)
app.use('/api/userRoutes', tokenService.verifyToken, userRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/benefits', benefitRoutes)
app.use('/api/comments', commentRoutes)
// /api/foundations /1
app.use('/api/foundations', foundationRoutes)
app.use('/api/search', searchRouter)



const startServer = async () => {
    await sequelize.sync({alter:false})
    initcategories();
}
app.listen(PORT, (error) => {
    if (error) {
        console.log("error", error)
    } else {
        console.log(`Server is listening on port ${PORT}`)
        startServer();
    }
})




