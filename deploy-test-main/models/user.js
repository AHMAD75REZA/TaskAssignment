const mongoose = require('mongoose');
const path = require('path');


const logSchema = new mongoose.Schema({
  content: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Log', logSchema);

