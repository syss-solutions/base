var express = require('express');
var router = express.Router();

// We've to define a middleware to use for all requests.
router.use(function(req, res, next) {
  next(); // Make sure we go to the next routes and don't stop here
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
