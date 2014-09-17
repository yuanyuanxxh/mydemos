var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');

var schema = new mongoose.Schema({
  name: String,
  path: String,
  detail: String,
  comments:[{
      username: String,
      content: String,
      time: String
  }]
});

module.exports = mongoose.model('Photo', schema);

