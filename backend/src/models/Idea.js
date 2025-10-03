const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  text: { type: String, required: true, maxlength: 280 },
  image: { 
    data: Buffer,
    contentType: String,
    originalName: String
  },
  upvotes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Idea', IdeaSchema);
