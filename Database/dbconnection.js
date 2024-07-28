import { Sequelize, DataTypes} from "sequelize";
//Database:
const sequelize = new Sequelize('mysql://ukrl2aq1djc5n45g:2XjNUz8zN4mdgzXWGbcz@bgpj0gbkedzis273xcws-mysql.services.clever-cloud.com:3306/bgpj0gbkedzis273xcws');

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(() => {
      console.error("Unable to connect to the database:");
    });

    export default sequelize;