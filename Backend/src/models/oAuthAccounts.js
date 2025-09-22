// models/oAuthAccount.js
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.connection.js";

class OAuthAccount extends Model {}

OAuthAccount.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    provider: {
      type: DataTypes.STRING(50), // e.g. "google", "github", "apple"
      allowNull: false,
    },
    providerId: {
      type: DataTypes.STRING(255), // provider’s unique ID (sub)
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.STRING(2000), // portable size
      allowNull: true,
    },
    refreshToken: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "OAuthAccount",
    tableName: "oauth_accounts",
    timestamps: true,
    paranoid: true, // soft delete for unlinking
    indexes: [
      {
        unique: true,
        fields: ["provider", "providerId"], // enforce one providerId per provider
      },
    ],
  }
);

export default OAuthAccount;
