// models/report.js

const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    // Other report-related fields
});

module.exports = mongoose.model('Report', reportSchema);
