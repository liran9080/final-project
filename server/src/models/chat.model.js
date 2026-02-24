import {DataTypes, Model} from 'sequelize'

export default (sequelize) =>{
    class Chat extends Model{
        static associate(models){
            this.belongsTo(models.User, {foreignKey:'userId'});
        }
    }
    Chat.init({
        chatId:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        senderId:{type:DataTypes.INTEGER, autoIncrement:false, primaryKey:true, references:{model:'users', key:'userId'}},
        receiverId:{type:DataTypes.INTEGER, autoIncrement:false, primaryKey:true, references:{model:'users', key:'userId'}},
        createdDate:{type:DataTypes.DATE, allowNull:false, defaultValue:DataTypes.NOW}, 
        text:{type:DataTypes.TEXT, allowNull:false},
        read:{type:DataTypes.BOOLEAN, allowNull:false},
    },{sequelize,modelName:'Chat', tableName:'chat'});
    return Chat
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
