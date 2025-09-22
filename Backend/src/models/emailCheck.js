// models/emailCheck.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.connection.js";
import User from "./users.js";

class EmailCheck extends Model {}

EmailCheck.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: "userId",
      },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "EmailCheck",
    tableName: "email_checks",
    timestamps: true,
  }
);

export default EmailCheck;
