var express = require('express');
var router = express.Router();



/* GET Userlist page. */
router.get('/', function(req, res) {
  var db = require("../db");
  var Users = db.Mongoose.model('tecweb-collection', db.UserSchema,
'tecweb-collection');
  Users.find({}).lean().exec(
     function (e, docs) {
       res.json(docs);
       res.end();
  });
});

/* GET ONE users. */
router.get('/:id', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('tecweb-collection', db.UserSchema,
'tecweb-collection');
  User.find({ _id: req.params.id }).lean().exec(function (e,
docs) {
      res.json(docs);
      res.end();
  });
});

/* POST ONE users. */
router.post('/', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('tecweb-collection', db.UserSchema,
'tecweb-collection');
  var newuser = new User({ username: req.body.name, email:
req.body.email });
  newuser.save(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(newuser);
      res.end();
  });
});

/* DELETE ONE user. */
router.delete('/:id', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('tecweb-collection',
db.UserSchema, 'tecweb-collection');
  User.find({ _id: req.params.id }).remove(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json({success: true});
      res.end();
  });
});

module.exports = router;
