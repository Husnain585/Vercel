// models/productImage.js
import { DataTypes, Model, Op } from "sequelize";
import sequelize from "../config/db.connection.js";
import Product from "./Product.js";

class ProductImage extends Model {}

ProductImage.init(
  {
    imageId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // ✅ Sequelize's built-in UUID generator
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Product,
        key: "productId",
      },
      onDelete: "CASCADE",
    },
    data: {
      type: DataTypes.BLOB, // ✅ stores binary data
      allowNull: false,
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    altText: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "ProductImage",
    tableName: "product_images",
    timestamps: true,
    paranoid: true,
    hooks: {
      async beforeSave(image) {
        if (image.isPrimary) {
          await ProductImage.update(
            { isPrimary: false },
            {
              where: {
                productId: image.productId,
                imageId: { [Op.ne]: image.imageId }, // ✅ use Op.ne directly
              },
            }
          );
        }
      },
    },
  }
);

export default ProductImage;
