// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true },
    password:{ type: String, required: true },
    role:  { type: String, required: true, enum: ['admin', 'user', 'User','Admin'], default: 'user'},
    branch: { type: String, required: true },
    // Other user-related fields
});
// Method to compare password
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema);
