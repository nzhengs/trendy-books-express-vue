var express = require('express');
var router = express.Router();

const response =  require('./nyt-response.json');

router.get('/', function(req, res, next) {
  res.send(response);
});

module.exports = router;
