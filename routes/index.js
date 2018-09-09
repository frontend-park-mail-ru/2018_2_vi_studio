var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

router.get('/enter', function(req, res, next) {
    res.render('enter', {});
});

router.get('/reg', function(req, res, next) {
    res.render('reg', {});
});

router.get('/rules', function(req, res, next) {
    res.render('rules', {});
});

router.get('/top', function(req, res, next) {
    res.render('top', {});
});

module.exports = router;
