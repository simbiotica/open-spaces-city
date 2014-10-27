var mongoose = require('mongoose');

/**
 * Create Tweet Schema
 * @type {Object}
 */
var TweetSchema = mongoose.Schema({
  tweetId: {
    type: Number,
    required: true,
    unique: true
  },
  text: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  coordinates: {
    type: String
  },
  hashtags: {
    type: Array
  },
  date: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Export Tweet Model
 * @type {Object}
 */
module.exports = mongoose.model('Tweet', TweetSchema);
