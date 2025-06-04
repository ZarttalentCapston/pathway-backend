import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Role from "./Role";


interface ResourceAttributes {
  id?: number;
  title: string;
  url: string;
  roleId: number;
  skills: string[];
}

class Resource extends Model<ResourceAttributes> implements ResourceAttributes {
  public id!: number;
  public title!: string;
  public url!: string;
  public roleId!: number;
  public skills!: string[];
}

Resource.init(
  {
    title: { type: DataTypes.STRING },
    url: { type: DataTypes.STRING },
    roleId: { type: DataTypes.INTEGER },
    skills: { type : DataTypes.JSONB, defaultValue: []}
  },
  { sequelize, modelName: "Resource" }
);

Resource.belongsTo(Role, { foreignKey: "roleId" });

export default Resource;