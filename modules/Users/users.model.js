import { DataTypes } from "sequelize";
import sequelize from "../../Database/dbconnection.js";
import { postModel } from "../Posts/posts.model.js";

//create table for user:Define a Sequelize model for users with the following fields: username, email, and password.
export const userModel = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

//linked to the User model:
userModel.hasMany(postModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
postModel.belongsTo(userModel);
