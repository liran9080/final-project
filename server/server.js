import express from 'express'
import cors from 'cors'

import categoriesRoutes from './src/routes/category.routes.js'
import benefitRoutes from './src/routes/benefit.routes.js'
import userRoutes from './src/routes/user.routes.js'
import authRoutes from './src/routes/auth.routes.js'
import commentRoutes from './src/routes/comment.routes.js'
import foundationRoutes from './src/routes/foundation.routes.js'
import searchRouter from './src/routes/search.routes.js'

import tokenService from './src/middleware/token.service.js'

import models, {sequelize} from './src/models/index.js'


const PORT = 5566
const app = express();


app.use(cors())
app.use(express.json())

// http verbs: get, post, put, patch, delete, option
//http://127.0.0.1:5566 /api/foundations/1
app.use('/api/auth', authRoutes)
app.use('/api/users', tokenService.verifyToken, userRoutes)
app.use('/api/categories', categoriesRoutes)
app.use('/api/benefits', benefitRoutes)
app.use('/api/comments', commentRoutes)
// /api/foundations /1
app.use('/api/foundations', foundationRoutes)
app.use('/api/search', searchRouter)



const startServer = async () => {
    await sequelize.sync({alter:true})
    // const category = await models.Category.create({
    //     name:'השכלה'
    // })
}
app.listen(PORT, (error) => {
    if (error) {
        console.log("error", error)
    } else {
        console.log(`Server is listening on port ${PORT}`)
        startServer();
    }
})




