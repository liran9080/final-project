import {DataTypes, Model} from 'sequelize'

export default (sequelize) =>{
    class Benefit extends Model{
        static associate(models){
            this.belongsTo(models.Category, {foreignKey:'categoryId'})
        }
    }
    Benefit.init({
        benefitId:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        title:{type:DataTypes.STRING, allowNull:false, unique:true},
        description:{type:DataTypes.TEXT, allowNull:false}
    },{sequelize,modelName:'Benefit', tableName:'benefits'});
    return Benefit
}
