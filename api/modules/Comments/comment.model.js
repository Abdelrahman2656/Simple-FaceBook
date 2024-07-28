import { DataTypes } from "sequelize";
import sequelize from "../../Database/dbconnection.js";
import { postModel } from "../Posts/posts.model.js";
import { userModel } from "../Users/users.model.js";

//Define a Sequelize model for comments with the following fields: content, postId (linked to the post model), and userId (linked to the User model).
export const commentModel = sequelize.define(
  "comment",
  {
    comment: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
// //postId (linked to the post model), and userId (linked to the User model).
postModel.hasMany(commentModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
commentModel.belongsTo(postModel);
userModel.hasMany(commentModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
commentModel.belongsTo(userModel);
