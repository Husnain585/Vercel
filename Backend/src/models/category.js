// models/category.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.connection.js";

class Category extends Model {}

Category.init(
  {
    categoryId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // Sequelize auto-generates UUID
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "categories",
    timestamps: true,
  }
);

export default Category;
