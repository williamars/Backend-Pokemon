const bodyParser = require('body-parser');
var express = require('express');
var router = express.Router();
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }));  

// Route to get all reviews
// app.get("/", function(req,res) {
//     db.Review.find({})
//     .then(function(dbReviews) {
//       res.json(dbReviews);
//     })
//     .catch(function(err) {
//       res.json(err);
//     })
//   });