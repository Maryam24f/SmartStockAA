// controllers/authController.js
const User = require('../modals/userSchema');
const jwt = require('jsonwebtoken');
const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find the user in the database by username
      const user = await User.findOne({ username });
  
      // If the user is not found, return an error
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      // Compare the provided password with the password stored in the database
      if (user.password === password) {
        // If passwords match, login successful
        console.log("useremail: "+user.email)
        return res.status(200).json({ message: "Login successful", user: { username: user.username, email: user.email, role: user.role, branch: user.branch }
        });
          
      } else {
        // If passwords don't match, return an error
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  

module.exports = { login };
