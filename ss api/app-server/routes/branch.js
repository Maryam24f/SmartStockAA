const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');

// Get assets by branch
router.get('/:branch/:category', (req, res) => {
    console.log('GET /branch/:branch/:category endpoint called');
    console.log('Params:', req.params); // Log received parameters
    branchController.getAssetsByBranchAndCategory(req, res);
  });

// Delete a branch
router.delete('/delete/:id', (req, res) => {
    console.log('DELETE /:id endpoint called');
    console.log('Params:', req.params); // Log received parameters
    branchController.deleteBranch(req, res);
});


// Create a new branch
router.post('/', (req, res) => {
    console.log('POST / endpoint called');
    console.log('Request Body:', req.body); // Log received request body
    branchController.createBranch(req, res);
});


// Get all branches
router.get('/', (req, res) => {
    console.log('GET / endpoint called');
    branchController.getBranches(req, res);
});

module.exports = router;
