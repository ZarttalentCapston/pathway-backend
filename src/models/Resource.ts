import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";
import Role from "./Role";

interface ResourceAttributes {
  id?: number;
  title: string;
  url: string;
  roleId: number;
  skills: string[];
  platform: string;
  cost: number;
  level: string;
}


class Resource extends Model<ResourceAttributes> implements ResourceAttributes {
  public id!: number;
  public title!: string;
  public url!: string;
  public roleId!: number;
  public skills!: string[];
  public platform!: string;
  public cost!: number;
  public level!: string;
}

Resource.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    roleId: { type: DataTypes.INTEGER, allowNull: false },
    skills: { type: DataTypes.JSONB, defaultValue: [] },
    platform: { type: DataTypes.STRING, allowNull: false },
    cost: { type: DataTypes.FLOAT, allowNull: false },
    level: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, modelName: "Resource" }
);


export default Resource;