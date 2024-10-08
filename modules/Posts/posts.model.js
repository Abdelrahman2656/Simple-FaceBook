import { DataTypes } from "sequelize"; // Importing DataTypes from Sequelize to define model fields
import sequelize from "../../Database/dbconnection.js"; // Importing the sequelize instance for database connection

// Creating a table for posts by defining a Sequelize model
export const postModel = sequelize.define(
  "post", // The name of the table
  {
    // Defining the fields of the table
    title: {
      type: DataTypes.STRING(200), // String type with a maximum length of 200 characters
      allowNull: false, // The field is required
    },
    content: {
      type: DataTypes.STRING(200), // String type with a maximum length of 200 characters
      allowNull: false, // The field is required
    },
  },
  {
    timestamps: false, // Disabling the automatic generation of createdAt and updatedAt fields
  }
);
