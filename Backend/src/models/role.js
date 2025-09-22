// models/role.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.connection.js";

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // ✅ built-in UUID generator
    },
    name: {
      type: DataTypes.STRING(50), // e.g. "admin", "customer", "vendor"
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
    timestamps: false,
  }
);

export default Role;
