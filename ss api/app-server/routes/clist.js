const express = require('express');
const router = express.Router();
const { createClist, getClists, getDataByBranch } = require('../controllers/ClistController');

router.get('/:branch', getDataByBranch)

// Route to create new data
router.post('/', createClist);

// Route to fetch all data
router.get('/', getClists);

module.exports = router;
