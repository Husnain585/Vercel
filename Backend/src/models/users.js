// models/User.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.connection.js";

class User extends Model {
  toJSON() {
    const values = { ...this.get() };
    delete values.password; // hide password when serializing
    return values;
  }
}

User.init(
  {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // ✅ auto-generated UUID
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(1000),
      allowNull: true, // OAuth users can have null password
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    role: {
      type: DataTypes.ENUM("customer", "admin", "vendor"),
      allowNull: false,
      defaultValue: "customer",
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
    paranoid: true, // soft delete
  }
);

export default User;
