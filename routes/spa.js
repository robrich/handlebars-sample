'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res/*, next*/) {
  res.render('spa', { title: 'SPA Form Editing' });
});

module.exports = router;
