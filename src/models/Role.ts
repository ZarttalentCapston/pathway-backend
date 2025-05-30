import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";


interface RoleAttributes {
  id?: number;
  name: string;
  requiredSkills: string[];
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;
  public requiredSkills!: string[];
}

Role.init(
  {
    name: { type: DataTypes.STRING, unique: true },
    requiredSkills: { type: DataTypes.JSONB, defaultValue: [] },
  },
  { sequelize, modelName: "Role" }
);

export default Role;