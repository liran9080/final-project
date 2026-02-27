import {DataTypes, Model} from 'sequelize'



export default (sequelize) =>{
    class UserRequest extends Model{
        static associate(models){
            this.belongsTo(models.User, {foreignKey:'userId'})
            this.belongsTo(models.Benefit, {foreignKey:'benefitId'})
        }
    }
    UserRequest.init({
        userRequestId:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        userId:{type:DataTypes.INTEGER, references:{model:'users', key:'userId'}},
        benefitId:{type:DataTypes.INTEGER, references:{model:'benefits', key:'benefitId'}},
        createdDate:{type:DataTypes.DATE, allowNull:false, defaultValue:DataTypes.NOW},
        details:{type:DataTypes.TEXT, allowNull:false},
        status:{type:DataTypes.TEXT, allowNull:false, defaultValue:'pending'},
    },{sequelize,modelName:'UserRequest', tableName:'userRequest'});
    return UserRequest
}
// status: pending, received