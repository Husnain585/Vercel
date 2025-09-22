// models/Vendor.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.connection.js";
import User from "./User.js";

class Vendor extends Model {}

Vendor.init(
  {
    vendorId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // auto-generated UUID
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: "userId",
      },
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING(100),
      allowNull: true,
      validate: { isEmail: true },
    },
    contactPhone: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "active", "suspended", "deactivated"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Vendor",
    tableName: "vendors",
    timestamps: true,
    paranoid: true, // soft delete
  }
);

export default Vendor;
