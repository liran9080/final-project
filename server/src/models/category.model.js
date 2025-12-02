import {DataTypes, Model} from 'sequelize'

export default (sequelize) =>{
    class Category extends Model{
        static associate(models){
            this.hasMany(models.Benefit, {foreignKey:'categoryId', onDelete:'CASCADE'});
            this.hasMany(models.Foundation, {foreignKey:'categoryId', onDelete:'CASCADE'});
        }
    }
    Category.init({
        categoryId:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        name:{type:DataTypes.STRING, allowNull:false, unique:true}
    },{sequelize,modelName:'Category', tableName:'categories'});
    return Category
}
