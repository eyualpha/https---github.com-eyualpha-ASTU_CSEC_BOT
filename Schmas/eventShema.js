const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    topic: String,
    detail: String
})
module.exports = mongoose.model("Event", eventSchema);
