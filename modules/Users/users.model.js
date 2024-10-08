









import { DataTypes } from "sequelize"; // Importing DataTypes from Sequelize to define model fields
import sequelize from "../../Database/dbconnection.js"; // Importing the sequelize instance for database connection
import { postModel } from "../Posts/posts.model.js"; // Importing the post model

// Creating a table for users by defining a Sequelize model
export const userModel = sequelize.define(
  "user", // The name of the table
  {
    // Defining the fields of the table
    username: {
      type: DataTypes.STRING(200), // String type with a maximum length of 200 characters
      allowNull: false, // The field is required
    },
    email: {
      type: DataTypes.STRING(200), // String type with a maximum length of 200 characters
      allowNull: false, // The field is required
    },
    password: {
      type: DataTypes.STRING(200), // String type with a maximum length of 200 characters
      allowNull: false, // The field is required
    },
  },
  {
    timestamps: false, // Disabling the automatic generation of createdAt and updatedAt fields
  }
);

// Defining the relationship between the user model and the post model
userModel.hasMany(postModel, {
  onDelete: "CASCADE", // If a user is deleted, all associated posts are also deleted
  onUpdate: "CASCADE", // If a user is updated, all associated posts are also updated
});
postModel.belongsTo(userModel); // Each post belongs to a single user
