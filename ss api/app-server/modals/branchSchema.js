const mongoose = require('mongoose');
const branch = new mongoose.Schema({
    name: { type: String, required: false },
});

module.exports = mongoose.model('Branch', branch);