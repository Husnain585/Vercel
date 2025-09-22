const { DataTypes, Model } = require("sequelize");
const connection = require("../config/db.connection");
const { v4: uuid } = require("uuid");
const { hash } = require("bcryptjs");

class Admin extends Model {
  toJSON() {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}

Admin.init(
  {
    adminId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4, // ✅ Correct UUID generation
    },
    username: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("superadmin", "admin"),
      defaultValue: "admin",
    },
  },
  {
    sequelize: connection,
    modelName: "Admin",
    tableName: "admins",
    timestamps: true,
    paranoid: true,
  }
);

// Hook: hash password before create
Admin.beforeCreate(async (admin) => {
  admin.password = await hash(admin.password, 10);
});

module.exports = Admin;
