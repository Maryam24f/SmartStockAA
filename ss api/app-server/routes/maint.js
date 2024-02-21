const express = require('express');
const router = express.Router();
const { createMaint, getMaint, getDataByBranch, updateStatus} = require('../controllers/maintenanceController');
const multer = require('multer'); // Import Multer

// Multer configuration
const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set the filename of the uploaded file
  }
});
const upload = multer({ storage: storage });

router.get('/:branch', getDataByBranch)
router.post('/updateStatus', updateStatus)

// Route to create new data
router.post('/', upload.single('bill'), createMaint);

// Route to fetch all data
router.get('/', getMaint);

module.exports = router;
