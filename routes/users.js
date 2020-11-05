const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));  


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
  var newuser = new User({ username: req.body.username, password:
req.body.password });

  User.exists({username: req.body.username}, function(err, docs){
    if (req.body.username == ""){
      res.status(500).send({ message: "Username empty" });
      return;
    }
    if (req.body.password == ""){
      res.status(500).send({ message: "Password empty" });
      return;
    }
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (docs) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }
    User.exists({password: req.body.password}, function(err, docs){
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (docs) {
        res.status(400).send({ message: "Failed! Password is already in use!" });
        return;
      }
      newuser.save(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      console.log(newuser);
      res.json(newuser);
      res.end();
      });
    });  
  });
});

/* LOGIN. */
router.post('/login', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('tecweb-collection', db.UserSchema,
  'tecweb-collection');
  let usernamee = false;
  let passwordd = false;
  User.exists({username: req.body.username}, function(err, docs){
    if (req.body.username == ""){
      res.status(500).send({ message: "Username empty" });
      return;
    }
    if (req.body.password == ""){
      res.status(500).send({ message: "Password empty" });
      return;
    }
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (docs) {
      User.exists({password: req.body.password}, function(err, docs){
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (docs) {
          res.status(200).send({ message: "Credenciais corretas" });
          return;
        };
        if (!docs){
          res.status(400).send({ message: "Usuário ou senha incorreto" });
          return;
        }
      });
    };
    if (!docs){
      res.status(400).send({ message: "Usuário ou senha incorreto" });
      return;
    }
  });
  
});

// Route for creating a new Review and updating Product "review" field with it
router.post("/:id", function(req, res) {
  var db = require('../db')
  
  var User = db.Mongoose.model('tecweb-collection', db.UserSchema,
  'tecweb-collection');
  // var Pokemon = db.Mongoose.model('tecweb-collection',db.PokemonSchema,'tecweb-collection');
  // var newPokemon = new Pokemon({ pokemon: req.body.pokemon, type:
  //   req.body.type });
  // var newPokemon = new Pokemon({pokemon: req.body.pokemon,type: req.body.type});
  // Create a new note and pass the req.body to the entry
  User.update(req.params.id,{pokemons})
    .then(function(newPokemon) {
      // If a Review was created successfully, find one Product with an `_id` equal to `req.params.id`. Update the Product to be associated with the new Review
      // { new: true } tells the query that we want it to return the updated Product -- it returns the original by default
      // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return Pokemon.findOneAndUpdate({ _id: req.params.id }, {$push: {pokemons:newPokemon }}, { new: true });
    })
    .then(function(dbUser) {
      // If we were able to successfully update a Product, send it back to the client
      res.json(dbUser);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
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
