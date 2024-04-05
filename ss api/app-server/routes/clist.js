const express = require('express');
const router = express.Router();
const { createClist,sendNotification, getClists, getDataByBranch, updateStatus, updateTotal,updateClist } = require('../controllers/ClistController');
router.post('/updateTotal/:id/:total', updateTotal)
router.post('/update/:id', updateClist)
router.get('/:branch', getDataByBranch)
router.post('/updateStatus', updateStatus)
router.post('/send', sendNotification )
// Route to create new data
router.post('/', createClist);
// Route to fetch all data
router.get('/', getClists);
module.exports = router;
