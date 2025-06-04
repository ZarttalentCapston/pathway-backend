import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";


class Contact extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public message!: string;
    public createdAt!: Date;
    public updatedAt!: Date
}


Contact.init(
  {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,

    },

    name : {
        type : DataTypes.STRING,
        allowNull : false
    },

    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },

    message : {
        type : DataTypes.TEXT,
        allowNull : false
    },


  },
  {
    sequelize,
    modelName : "Contact",
    tableName : "Contacts",
    timestamps : true
  }
)

export default Contact