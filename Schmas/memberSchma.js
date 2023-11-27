const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    
})
module.exports = mongoose.model("Member", memberSchema);
