const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');
 
// Update Asset
router.put('/update/:id', assetController.updateAsset);

// Delete Asset
router.delete('/delete/:id', assetController.deleteAsset);

// Allocate Asset
router.put('/allocate/:id', assetController.allocateAsset);

// Get assets by category
router.get('/category/:category', assetController.getAssetsByCategory);

// Update route definition
router.get('/allocation/history/:category', assetController.getAllocationHistory);


// Get all assets
router.get('/', assetController.getAssets);

// Create a new asset
router.post('/', assetController.createAsset);


module.exports = router;
