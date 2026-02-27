import {DataTypes, Model} from 'sequelize'

export default (sequelize) =>{
    class Assignment extends Model{
        static associate(models){
            this.belongsTo(models.User, {foreignKey:'userId'});
            this.belongsTo(models.UserRequest, {foreignKey:'userRequestId'});
        }
    }
    Assignment.init({
        assignmentId:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        userId:{type:DataTypes.INTEGER, references:{model:'users', key:'userId'}},
        professionalId:{type:DataTypes.INTEGER, references:{model:'users', key:'userId'}},
        userRequestId:{type:DataTypes.INTEGER, references:{model:'userRequest', key:'userRequestId'}},
        createdDate:{type:DataTypes.DATE, allowNull:false, defaultValue:DataTypes.NOW}, 
        createdTime:{type:DataTypes.TIME, allowNull:false, defaultValue:DataTypes.NOW}, 
        
    },{sequelize,modelName:'Assignment', tableName:'assignment'});
    return Assignment
}
/*
1 - eligible
2 - professional
chatId  senderId    receiverId
1       1           2
2       2           1
3       2           1
4       1           2
select * from chat where senderId = 1 and receiverId =2 or senderId = 2 and receiverId =1

*/
