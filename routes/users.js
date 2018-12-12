var express = require('express');
var router = express.Router();

var controller = require('../controllers/users');

const validateToken = require('../utils').validateToken;

// We've to define a middleware to use for all requests.
router.use(function(req, res, next) {
  console.info('Results API access...');
  next(); // Make sure we go to the next routes and don't stop here
});

// POST user register.
router.post('/users/register', function(req, res, next) {
  controller.add(req,res);
});

// GET user login.
router.get('/login', function(req, res, next) {
  controller.login(req,res);
});

// GET get all users. Token required.
router.get('/users/all', validateToken, function(req, res, next) {
  controller.getAll(req,res);
});

module.exports = router;
