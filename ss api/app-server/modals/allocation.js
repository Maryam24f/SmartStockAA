// models/asset.js
const mongoose = require('mongoose');
const allocation = new mongoose.Schema({
    name: { type: String, required: false },
    type: { type: String, required: false },
    tag: { type: String, required: false },
    details: { type: String, required: false },
    branch: { type: String, required:false },
    category: {type: String, required:false },
    quantity: {type: Number, required: false },
    date: { type: String, required: false },
    status: { type: String, required: false },
    // Other asset-related fields
});
module.exports = mongoose.model('Allocation', allocation);
