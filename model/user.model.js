const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Require your Sequelize instance

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  join_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Synchronize the model with the database (create the "User" table if it doesn't exist)
User.sync();

module.exports = User;
