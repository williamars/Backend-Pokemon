var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://root:root123@cluster0.6l7by.mongodb.net/tecweb-db?retryWrites=true&w=majority');
// mongoose.connect('mongodb://localhost:27017/datatest',{useNewUrlParser:true});
var userSchema = new mongoose.Schema({
    username: String,
    password: String
    // pokemons:[{
    //     pokemon: String,
    //     type: String
    // }
    // ],
}, { collection: 'tecweb-collection' });
module.exports = { Mongoose: mongoose, UserSchema: userSchema }
