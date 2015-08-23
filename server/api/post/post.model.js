'use strict';

//Guarda tambe la info del user (estara replicada)
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  user_id: String,
  user_name: String,
  user_username: String,
  user_photo: String,
  user_type: String,
  hashtag: String,
  date: Date,
  description: String,
  description_ext: String,
  foto: String,
  deadline: Date,
  location: String,
  age: Number,
  bases: String,
  type: String
});

module.exports = mongoose.model('Post', PostSchema);
