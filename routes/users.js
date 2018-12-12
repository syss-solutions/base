var express = require('express');
var router = express.Router();

var controller = require('../controllers/users');

// We've to define a middleware to use for all requests.
router.use(function(req, res, next) {
  console.info('Results API access...');
  next(); // Make sure we go to the next routes and don't stop here
});

/* GET users listing. */
router.get('/users', function(req, res, next) {
  controller.add(req,res);
});

module.exports = router;
