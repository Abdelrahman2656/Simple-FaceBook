import { DataTypes } from "sequelize";
import sequelize from "../../Database/dbconnection.js";


export const postModel = sequelize.define(
  "post",
  {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    
  },
  {
    timestamps: false,
  }
);
