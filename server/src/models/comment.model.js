import {DataTypes, Model} from 'sequelize'

export default (sequelize) =>{
    class Comment extends Model{
        static associate(models){
            this.belongsTo(models.User, {foreignKey:'userId'});
            this.belongsTo(models.Foundation, {foreignKey:'foundationId'});
        }
    }
    Comment.init({
        commentId:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        createdDate:{type:DataTypes.DATE, allowNull:false, defaultValue:DataTypes.NOW},    // 12.10.2025, 13:48:34
        text:{type:DataTypes.TEXT, allowNull:false}
    },{sequelize,modelName:'Comment', tableName:'comments'});
    return Comment
}
