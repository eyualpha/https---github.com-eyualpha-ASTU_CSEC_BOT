const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema({
  topic: String,
  detail: String,
  id: String,
});
module.exports = mongoose.model("Event", eventSchema);
