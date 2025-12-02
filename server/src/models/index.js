'use strict';
import { Sequelize } from "sequelize";
import CategoryModel from './category.model.js'
import BenefitModel from './benefit.model.js'
import FoundationModel from './foundation.model.js'
import UserModel from './user.model.js'
import CommentModel from './comment.model.js'
import dotenv from 'dotenv'
dotenv.config()

 // 'postgres://user:password@10.0.0.10:5432/database'
 export const sequelize = new Sequelize(process.env.DB_URL)

const models = {
  Category: CategoryModel(sequelize),
  Benefit: BenefitModel(sequelize),
  Foundation: FoundationModel(sequelize),
  User: UserModel(sequelize),
  Comment: CommentModel(sequelize)
}
 Object.values(models).forEach( model => {
  if( typeof model.associate == "function"){
    model.associate(models)
  }
 })


 export default models