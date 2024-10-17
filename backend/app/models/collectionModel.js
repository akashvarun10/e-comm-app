// models/collectionModel.js
const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Collection', collectionSchema);