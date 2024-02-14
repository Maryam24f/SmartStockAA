const mongoose = require('mongoose');
const cList = new mongoose.Schema({
    Aname: { type: String, required: false },
    branch: { type: String, required:false },
    month: {type: String, required:false },
    au: {type: String, required:false },
    quantity: {type: Number, required: false },
    amount: {type: Number, required: false },
    total: {type: Number, required: false },
    subTotal:{type: Number, required: false },
    status: { type: String, required: false },
    // Other asset-related fields
});

module.exports = mongoose.model('Clist', cList);