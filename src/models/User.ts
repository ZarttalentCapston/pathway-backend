import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Role from './Role';


class User extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public currentRole?: string; 
  public skills!: string[];
  public targetRole?: Role;
  public targetRoleId?: number;
  public progress!: { completedSkills: number[];  totalSkills : number; onboardingStep: number };
  public otpCode!: string;
  public otpCodeExpiry?: Date;
  public isVerified!: boolean;
  public verificationToken?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
    },
    targetRoleId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Roles',
        key: 'id',
      },
    },
    progress: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: { completedResources: [], acquiredSkills: [] },
    },

    otpCodeExpiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verificationToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true, 
  }
);


export default User;
