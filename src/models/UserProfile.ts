import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";


interface UserAttributes {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  targetRole?: string;
  matchedSkills?: string[];
  joinedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id" | "avatarUrl" | "targetRole" | "matchedSkills" | "joinedAt"> {}

class UserProfile extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public passwordHash!: string;
  public avatarUrl?: string;
  public targetRole?: string;
  public matchedSkills?: string[];
  public joinedAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserProfile.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    passwordHash: { type: DataTypes.STRING, allowNull: false },
    avatarUrl: { type: DataTypes.STRING },
    targetRole: { type: DataTypes.STRING },
    matchedSkills: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
    joinedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default  UserProfile