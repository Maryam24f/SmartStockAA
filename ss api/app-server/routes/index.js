var express = require('express');

var router = express.Router();
const assetController = require('../controllers/assetController');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/assets', (req, res) => {
  console.log('Asset Route Hit');
  assetController.createAsset(req, res);
});

module.exports = router;
