'use strict';

var _ = require('lodash');
var Authenticate = require('./authenticate.model');

// Get list of authenticates
exports.index = function(req, res) {
  // Authenticate.find(function (err, authenticates) {
  //   if(err) { return handleError(res, err); }
  //   return res.status(200).json(authenticates);
  // });
  res.redirect("hype://login?access_token=aaa&token_type=token&state=somestate&user_id=00001&display_name=Hatsune%20Miku&at_name=@MikuVocaloid");
};

// Get a single authenticate
exports.show = function(req, res) {
  Authenticate.findById(req.params.id, function (err, authenticate) {
    if(err) { return handleError(res, err); }
    if(!authenticate) { return res.status(404).send('Not Found'); }
    return res.json(authenticate);
  });
};

// Creates a new authenticate in the DB.
exports.create = function(req, res) {
  Authenticate.create(req.body, function(err, authenticate) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(authenticate);
  });
};

// Updates an existing authenticate in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Authenticate.findById(req.params.id, function (err, authenticate) {
    if (err) { return handleError(res, err); }
    if(!authenticate) { return res.status(404).send('Not Found'); }
    var updated = _.merge(authenticate, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(authenticate);
    });
  });
};

// Deletes a authenticate from the DB.
exports.destroy = function(req, res) {
  Authenticate.findById(req.params.id, function (err, authenticate) {
    if(err) { return handleError(res, err); }
    if(!authenticate) { return res.status(404).send('Not Found'); }
    authenticate.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}
