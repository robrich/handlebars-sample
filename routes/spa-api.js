'use strict';

var express = require('express');
var dataAccess = require('../data-access');

var router = express.Router();

// get all
router.get('/', function(req, res, next) {
  dataAccess.getAll(function (err, data) {
    if (err) {
      return next(err);
    }
    res.json(data);
  });
});

// get new
router.get('/add', function(req, res/*, next*/) {
  var data = {id: 'add', active: true};
  res.json(data);
});

// save new
router.post('/add', function(req, res, next) {
  var data = req.body;

  // TODO: add data validation
  data.active = !!data.active;

  dataAccess.add(data, function (err, obj) {
    if (err) {
      return next(err);
    }
    res.json({success: true, id: obj.id});
  });
});

// get edit
router.get('/:id', function(req, res, next) {
  var id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return next(); // 404
  }
  dataAccess.getById(id, function (err, data) {
    if (err) {
      return next(err);
    }
    if (!data) {
      return next(); // 404
    }
    res.json(data);
  });
});

// save edit
router.post('/:id', function(req, res, next) {
  var id = parseInt(req.params.id, 10);
  if (isNaN(id) || !id) {
    return next(); // 404
  }
  var data = req.body;
  data.id = id;

  // TODO: add data validation
  data.active = !!data.active;

  dataAccess.update(data, function (err, obj) {
    if (err) {
      return next(err);
    }
    res.json({success: true, id: obj.id});
  });
});

module.exports = router;
