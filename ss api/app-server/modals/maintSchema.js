// models/maintenance.js

const mongoose = require('mongoose');
const maintenanceSchema = new mongoose.Schema({
    name: { type: String, required: false },
    type: { type: String, required: false },
    tag: { type: String, required: false },
    demand: { type: String, required: true },
    date: {type: String, required:false  },
    branch: { type: String, required:false },
    category: {type: String, required:false },
    supplier: {type: String, required:false },
    cost: {type: Number, required:false },
    bill: { data: Buffer, contentType: String },
    status: { type: String, required: false },
});
module.exports = mongoose.model('Maintenance', maintenanceSchema);
