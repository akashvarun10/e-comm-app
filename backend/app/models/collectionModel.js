//models/collectionModel.js
const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  colorStart: { type: String, default: "#0000ff" },
  colorEnd: { type: String, default: "#ff00ff" },
});

module.exports = mongoose.model("Collection", collectionSchema);
