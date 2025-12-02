import {DataTypes, Model} from 'sequelize'

export default (sequelize) =>{
    class Foundation extends Model{
        static associate(models){
            this.belongsTo(models.Category, {foreignKey:'categoryId'})
            this.hasMany(models.Comment, {foreignKey:'foundationId', onDelete:'CASCADE'});
        }
    }
    Foundation.init({
        foundationId:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        name:{type:DataTypes.STRING, allowNull:false, unique:true},
        area:{type:DataTypes.STRING, allowNull:false},
        address:{type:DataTypes.STRING, allowNull:false},
        phone:{type:DataTypes.STRING, allowNull:false},
        email:{type:DataTypes.STRING, allowNull:false, unique:true},
        description:{type:DataTypes.TEXT, allowNull:false},
    },{sequelize,modelName:'Foundation', tableName:'foundations'});
    return Foundation
}
