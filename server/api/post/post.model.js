'use strict';

//Guarda tambe la info del user (estara replicada) perque en mongo no es pot fer merge (fer merge és lent)
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  user_id: String,
  user_name: String,
  user_username: String,
  user_photo: String,
  user_is_business: String,
  hashtag: String,
  date: Date,
  description: String,
  description_ext: String,
  photo: String,
  deadline: String,
  location: String,
  age: Number,
  bases: String,
  type: String
});

module.exports = mongoose.model('Post', PostSchema);
