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
          User.find({ username: req.body.username }).lean().exec(function (e,
            docs) {
                  res.json(docs[0]['_id']);
                  res.end();
                  return;
              });
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

// Route for creating a new Pokemon and updating User "pokemons" field with it
router.post("/pokemon/:id", function(req, res) {
  var db = require('../db')
  
  var User = db.Mongoose.model('tecweb-collection', db.UserSchema,
  'tecweb-collection');
  // Create a new note and pass the req.body to the entry
  User.findByIdAndUpdate(req.params.id,{
    $push:{
      pokemons: {
        pokemon:req.body.pokemon,
        type: req.body.type,
        form: req.body.form,
        attack: req.body.attack,
        defense: req.body.defense,
        stamina: req.body.stamina

      }
    }
  },{new: true, useFindAndModify:false},function(err, docs){
    if (err){
      res.status(500).json({ error: err.message });
          res.end();
          return;
    }
    res.json({success: true});
      res.end();
  }
  )
});

router.put("/pokemon/:id", function(req,res) {
  var db = require("../db")
  var User = db.Mongoose.model('tecweb-collection', db.UserSchema,
  'tecweb-collection');
  User.findByIdAndUpdate(req.params.id,{
    $pull:{
      pokemons: { pokemon:req.body.pokemon
}
    }
  }, {new: true, useFindAndModify:false, multi: true},function(err, docs){
    if (err){
      res.status(500).json({ error: err.message });
          res.end();
          return;
    }
    res.json({success: true, doc: docs, req: req.body.pokemon
    });
      res.end();
  })
})

// Route for creating a new Pokemon-Battle and updating User "pokemons-battle" field with it
router.post("/pokemon-battle/:id", function(req, res) {
  var db = require('../db')
  
  var User = db.Mongoose.model('tecweb-collection', db.UserSchema,
  'tecweb-collection');
  // Create a new note and pass the req.body to the entry
  User.findByIdAndUpdate(req.params.id,{
    $push:{
      pokemon_battle: {
        pokemon:req.body.pokemon,
        type: req.body.type,
        form: req.body.form,
        attack: req.body.attack,
        defense: req.body.defense,
        stamina: req.body.stamina
      }
    }
  },{new: true, useFindAndModify:false},function(err, docs){
    if (err){
      res.status(500).json({ error: err.message });
          res.end();
          return;
    }
    res.json({success: true});
      res.end();
  }
  )
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
