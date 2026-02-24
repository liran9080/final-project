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
        professionalCode:{type:DataTypes.TEXT, allowNull:false, defaultValue:'12345'},
    },{sequelize,modelName:'Foundation', tableName:'foundations'});
    return Foundation
}


export const Foundation2UserModel = (sequelize) =>{
    class Foundation2User extends Model{
        static associate(models){
            this.belongsTo(models.User, {foreignKey:'userId'})
            this.belongsTo(models.Foundation, {foreignKey:'foundationId'})
        }
    }
    Foundation2User.init({
        foundationId:{type:DataTypes.INTEGER, autoIncrement:false, primaryKey:true, references:{model:'foundations', key:'foundationId'}},
        userId:{type:DataTypes.INTEGER, autoIncrement:false, primaryKey:true, references:{model:'users', key:'userId'}},
    },{sequelize,modelName:'Foundation2User', tableName:'foundation2User'});
    return Foundation2User
}