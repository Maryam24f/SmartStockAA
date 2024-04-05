// models/asset.js
const mongoose = require('mongoose');
const asset = new mongoose.Schema({
    name: { type: String, required: false },
    type: { type: String, required: false },
    tag: { type: String, required: false },
    details: { type: String, required: false },
    branch: { type: String, required:false },
    category: {type: String, required:false },
    quantity: {type: Number, required: false },
    status: { type: String, required: false },
    pdf: {
        data: Buffer, // Store the file data
        contentType: String // Store the MIME type of the file
    },
});

module.exports = mongoose.model('Asset', asset);
