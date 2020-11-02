var mongoose = require('mongoose');
const DB_URI= process.env.MONGODB_URI;
const connect = () =>{
    mongoose.connect(DB_URI,{useNewUrlParser:true});
    const connection = mongoose.connection;
    connection.on('error', ()=> console.error('Erro ao se conectar no mongo'));
connection.once('open', ()=>console.log('Estamos conectados no mongo!'));
}
mongoose.connect(DB_URI,{useNewUrlParser:true});
// mongoose.connect('mongodb://localhost:27017/datatest');
var userSchema = new mongoose.Schema({
    username: String,
    email: String
}, { collection: 'usercollection' }
);
module.exports = { Mongoose: mongoose, UserSchema: userSchema }
