const express = require('express');
const router = express.Router();
const { createClist, getClists, getDataByBranch, updateStatus, updateTotal } = require('../controllers/ClistController');
router.post('/updateTotal/:id/:total', updateTotal)
router.get('/:branch', getDataByBranch)
router.post('/updateStatus', updateStatus)

// Route to create new data
router.post('/', createClist);

// Route to fetch all data
router.get('/', getClists);

module.exports = router;
