// models/maintenance.js

const mongoose = require('mongoose');
const maintenanceSchema = new mongoose.Schema({
    assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    // Other maintenance-related fields
});

module.exports = mongoose.model('Maintenance', maintenanceSchema);
