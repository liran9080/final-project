import {DataTypes, Model} from 'sequelize'

export default (sequelize) =>{
    class User extends Model{
        static associate(models){
            this.hasMany(models.Comment, {foreignKey:'userId', onDelete:'CASCADE'});
        }
    }
    User.init({
        userId:{type:DataTypes.INTEGER, autoIncrement:true, primaryKey:true},
        email:{type:DataTypes.STRING, allowNull:false, unique:true},
        password:{type:DataTypes.STRING, allowNull:false},
        fullName:{type:DataTypes.STRING, allowNull:false},
        isAdmin:{type:DataTypes.BOOLEAN, allowNull:false},
        isProfessional:{type:DataTypes.BOOLEAN, allowNull:false, defaultValue:false},
        isDisabled:{type:DataTypes.BOOLEAN, allowNull:false, defaultValue:false},
    },{sequelize,modelName:'User', tableName:'users'});
    return User
}
