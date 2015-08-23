'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var findOrCreate = require('mongoose-findorcreate');

var UserSchema = new Schema({
  name: String,
  username: String,
  photo: String,
  type: Boolean
}).plugin(findOrCreate);

module.exports = mongoose.model('User', UserSchema);
