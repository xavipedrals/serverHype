'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  username: String,
  photo: String,
  type: Boolean
});

module.exports = mongoose.model('User', UserSchema);
