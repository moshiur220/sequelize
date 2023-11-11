const User = require("../model/user.model");

// Create a new user

const sampleUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    first_name: "John",
    last_name: "Doe",
  },
  {
    name: "Alice Smith",
    email: "alice@example.com",
    first_name: "Alice",
    last_name: "Smith",
  },
  {
    name: "Bob Johnson",
    email: "bob@example.com",
    first_name: "Bob",
    last_name: "Johnson",
  },
  {
    name: "Ella Davis",
    email: "ella@example.com",
    first_name: "Ella",
    last_name: "Davis",
  },
  {
    name: "Charlie Brown",
    email: "charlie1@example.com",
    first_name: "Charlie",
    last_name: "Brown",
  },
  {
    name: "Grace Wilson",
    email: "grace@example.com",
    first_name: "Grace",
    last_name: "Wilson",
  },
  {
    name: "David Clark",
    email: "david@example.com",
    first_name: "David",
    last_name: "Clark",
  },
  {
    name: "Sophia Hall",
    email: "sophia@example.com",
    first_name: "Sophia",
    last_name: "Hall",
  },
  {
    name: "Oliver Martinez",
    email: "oliver@example.com",
    first_name: "Oliver",
    last_name: "Martinez",
  },
  {
    name: "Emma White",
    email: "emma@example.com",
    first_name: "Emma",
    last_name: "White",
  },
  {
    name: "William Turner",
    email: "william@example.com",
    first_name: "William",
    last_name: "Turner",
  },
  {
    name: "Ava Harris",
    email: "ava@example.com",
    first_name: "Ava",
    last_name: "Harris",
  },
  {
    name: "James Adams",
    email: "james@example.com",
    first_name: "James",
    last_name: "Adams",
  },
  {
    name: "Mia Scott",
    email: "mia@example.com",
    first_name: "Mia",
    last_name: "Scott",
  },
  {
    name: "Benjamin Rodriguez",
    email: "benjamin@example.com",
    first_name: "Benjamin",
    last_name: "Rodriguez",
  },
  {
    name: "Amelia Rivera",
    email: "amelia@example.com",
    first_name: "Amelia",
    last_name: "Rivera",
  },
  {
    name: "Henry Baker",
    email: "henry@example.com",
    first_name: "Henry",
    last_name: "Baker",
  },
  {
    name: "Evelyn Green",
    email: "evelyn@example.com",
    first_name: "Evelyn",
    last_name: "Green",
  },
  {
    name: "Sebastian Perez",
    email: "sebastian@example.com",
    first_name: "Sebastian",
    last_name: "Perez",
  },
  {
    name: "Lily Price",
    email: "lily@example.com",
    first_name: "Lily",
    last_name: "Price",
  },
];

const createUser = async (req, res) => {
  try {
    // const user = await User.create(req.body);
    sampleUsers.forEach(async (user) => {
      await User.create(user);
    });

    // return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: "Could not create the user." });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1; // Current page
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10; // Users per page

    const offset = (page - 1) * perPage;

    const { count, rows: users } = await User.findAndCountAll({
      where: {
        email: "charlie@example.com",
      },
      limit: perPage,
      offset: offset,
    });

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
