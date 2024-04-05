const User = require('../modals/userSchema');
// Function to get all users //
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to create a new user
const createUser = async (req, res) => {
  const { username, email, password, role, branch } = req.body;

  try {
    const newUser = new User({
      username,
      email,
      password,
      role,
      branch
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

    // Function to update an existing user //
const updateUser = async (req, res) => {
  const { id } = req.params;
  try { 
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedUser);
  }
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } 
  catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserRoleByUsername = async (req, res, next) => {
    try {
      const { username } = req.params;
      // Find the user by username in the database
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      // If user is found, send back their role
      res.json({ role: user.role, branch: user.branch, email:user.email });
      console.log("useremail: "+user.email)
    } catch (error) {
      console.error('Error fetching user role:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = { getAllUsers, createUser, updateUser, deleteUser, getUserRoleByUsername };
