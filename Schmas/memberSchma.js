const mongoose = require('mongoose');
const memberSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String
})
module.exports = mongoose.model("Member", memberSchema);
