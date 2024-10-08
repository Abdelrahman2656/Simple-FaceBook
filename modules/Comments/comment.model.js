import { DataTypes } from "sequelize"; // Importing DataTypes from Sequelize to define model fields
import sequelize from "../../Database/dbconnection.js"; // Importing the sequelize instance for database connection
import { postModel } from "../Posts/posts.model.js"; // Importing the post model
import { userModel } from "../Users/users.model.js"; // Importing the user model

// Define a Sequelize model for comments with the following fields: content, postId (linked to the post model), and userId (linked to the user model)
export const commentModel = sequelize.define(
  "comment", // The name of the table
  {
    comment: {
      type: DataTypes.STRING(200), // String type with a maximum length of 200 characters
      allowNull: false, // The field is required
    },
  },
  {
    timestamps: false, // Disabling the automatic generation of createdAt and updatedAt fields
  }
);

// Define relationships between the models
// A post can have many comments
postModel.hasMany(commentModel, {
  onDelete: "CASCADE", // When a post is deleted, its comments are also deleted
  onUpdate: "CASCADE", // When a post is updated, its comments are also updated
});

// A comment belongs to a single post
commentModel.belongsTo(postModel);

// A user can have many comments
userModel.hasMany(commentModel, {
  onDelete: "CASCADE", // When a user is deleted, their comments are also deleted
  onUpdate: "CASCADE", // When a user is updated, their comments are also updated
});

// A comment belongs to a single user
commentModel.belongsTo(userModel);
