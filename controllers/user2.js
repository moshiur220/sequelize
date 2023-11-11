const User = require("../model/user.model");
const pick = require("../libs/pick");
const { Op } = require("sequelize");
// Create a new user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: "Could not create the user." });
  }
};

// Get all users
// http://localhost:3000/api/users?last_name=Smi&sortBy=name=DESC,first_name=DESC
const getUsers = async (req, res) => {
  const filter = pick(req.query, [
    "name",
    "email",
    "first_name",
    "last_name",
    "join_date",
  ]);

  const options = pick(req.query, ["sortBy", "Op", "limit", "page"]);

  try {
    const page = req.query.page ? parseInt(req.query.page) : 1; // Current page
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10; // Users per page

    const offset = (page - 1) * perPage;

    let queryOptions = {
      limit: perPage,
      offset: offset,
    };

    if (Object.keys(filter).length > 0) {
      // Apply the where clause only if the filter is not empty
      queryOptions.where = {};

      // Add LIKE search for each field
      Object.keys(filter).forEach((key) => {
        queryOptions.where[key] = {
          [Op.iLike]: `%${filter[key]}%`,
        };
      });
    }

    if (options.sortBy) {
      // Parse sortBy and convert it to the format expected by Sequelize
      queryOptions.order = options.sortBy
        .split(",")
        .map((sort) => sort.split("="));
    }

    const { count, rows: users } = await User.findAndCountAll(queryOptions);

    if (users.length === 0) {
      return res.status(404).json({ error: "No users found." });
    }

    const totalPages = Math.ceil(count / perPage);

    return res.status(200).json({
      users,
      meta: {
        count,
        totalPages,
        currentPage: page,
      },
    });
  } catch (error) {
    return res.status(400).json({ error: "Could not retrieve users." });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await User.update(req.body, { where: { id } });
    if (updated) {
      const updatedUser = await User.findOne({ where: { id } });
      return res.status(200).json(updatedUser);
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(404).json({ error: "User not found" });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await User.destroy({ where: { id } });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("User not found");
  } catch (error) {
    return res.status(404).json({ error: "User not found" });
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
};
