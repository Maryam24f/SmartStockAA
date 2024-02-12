var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

// Routes for user management
router.put('/:id', userController.updateUser);

// Route to get user role by username
router.get('/:username', userController.getUserRoleByUsername);
router.delete('/:id', userController.deleteUser);
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);

module.exports = router;
