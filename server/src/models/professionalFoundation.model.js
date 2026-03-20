import {DataTypes, Model} from 'sequelize'

export default (sequelize) =>{
    class ProfessionalFoundation extends Model{
        static associate(models){
            this.belongsTo(models.User, {foreignKey:'userId'});
            this.belongsTo(models.Foundation, {foreignKey:'foundationId'});
        }
    }
    ProfessionalFoundation.init({
        foundationId:{type:DataTypes.INTEGER, references:{model:'foundations', key:'foundationId'}},
        professionalId:{type:DataTypes.INTEGER, references:{model:'users', key:'userId', primaryKey:true}},
        
    },{sequelize,modelName:'ProfessionalFoundation', tableName:'professionalFoundation'});
    return ProfessionalFoundation
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
