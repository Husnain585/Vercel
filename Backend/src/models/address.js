import { DataTypes, Model } from "sequelize";
import connection from "../config/db.connection.js";


class Address extends Model {}

Address.init(
  {
    addressId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // ✅ correctly generate new UUID
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "users", key: "userId" },
    },
    street: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    postalCode: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: connection,
    modelName: "Address",
    tableName: "addresses",
    timestamps: true,
  }
);

export default Address;
