'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var User = require('../user/user.model');
var ObjectId = require('mongoose').Types.ObjectId;

// Get list of posts
exports.index = function(req, res) {
  console.log('Hola');
  console.log(req.query.date);
  if (req.query.recent10 != undefined) {
    // db.getCollection('posts').find({}).sort({date:-1}).limit(10);
    // http://localhost:9000/api/posts?recent10=true
    Post.find(function(err, post){
      if(err) { return handleError(res, err); }
      if(!post) { return res.status(404).send('Not Found'); }
      return res.json(post);
    }).sort({"date": -1}).limit(10);
  }
  else if (req.query.recent20 != undefined) {
    Post.find(function(err, post){
      if(err) { return handleError(res, err); }
      if(!post) { return res.status(404).send('Not Found'); }
      return res.json(post);
    }).sort({"date": -1}).limit(20);
  }
  else if (req.query.date != undefined){
    //Si hay una fecha devuelve todos a partir de la fecha
    //Formato fecha 2015-08-23T20:21:35.241Z
    var data = new Date(req.query.date);
    // db.getCollection('posts').find({date: {$gte: ISODate('2015-08-23T20:21:35.241Z')}})
    //la petició es http://localhost:9000/api/posts?date=2015-08-25T20:21:35.241Z
    Post.find({"date": {"$gte": data}}, function (err, post) {
      if(err) { return handleError(res, err); }
      if(!post) { return res.status(404).send('Not Found'); }
      return res.json(post);
    });
  } else {
    //Si no hay parametros devuelve todos
    Post.find(function (err, posts) {
      if(err) { return handleError(res, err); }
      return res.status(200).json(posts);
    });
  }
};

// Get a single post
exports.show = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    return res.json(post);
  });
};

// Creates a new post in the DB.
exports.create = function(req, res) {
  var user_username = req.body.user_username;

  User.find({"username": user_username}, function(err, user){
    if (err) { return handleError(res, err); }
    if(!user) { return res.status(404).send('Not Found');}
    var userId = new ObjectId(user._id);
    var dataAct = new Date();

    var aux = {
      user_id: userId,
      user_name: user.name,
      user_username: user.username,
      user_photo: user.photo,
      user_type: user.type,
      hashtag: req.body.hashtag,
      date: dataAct,
      description: req.body.description,
      description_ext: req.body.description_ext,
      photo: req.body.photo,
      deadline: req.body.deadline,
      location: req.body.location,
      age: req.body.age,
      bases: req.body.bases,
      type: req.body.type
    }
    Post.create(aux, function(err, post) {
      if(err) { return handleError(res, err); }
      return res.status(201).json(post);
    });
  });
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Post.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
