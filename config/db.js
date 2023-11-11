const { Sequelize } = require("sequelize");

// Database configuration
const DB_HOST = "localhost";
const DB_USER = "sql";
const DB_PASSWORD = "sql";
const DB_NAME = "sql";

// Create a Sequelize instance with the database configuration
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "postgres",
});

// Define an async function for connecting to the database
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// Immediately invoke the connection function
(async () => {
  await connectToDatabase();
})();

module.exports = sequelize;
