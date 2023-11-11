const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

// Create a new user
router.post("/users", userController.createUser);

// Get all users
router.get("/users", userController.getUsers);
router.post("/users/custom-query", userController.customQuery);

// Update a user by ID
router.put("/users/:id", userController.updateUser);

// Delete a user by ID
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
