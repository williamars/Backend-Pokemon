var mongoose = require('mongoose');
const MONGO_CONNECTION= process.env.MONGO_CONNECTION;
// const connect = () =>{
//     mongoose.connect(DB_URI,{useNewUrlParser:true});
//     const connection = mongoose.connection;
//     connection.on('error', ()=> console.error('Erro ao se conectar no mongo'));
// connection.once('open', ()=>console.log('Estamos conectados no mongo!'));
// }
//mongoose.connect(MONGO_CONNECTION,{useNewUrlParser:true});
mongoose.connect('mongodb+srv://root:root123@cluster0.6l7by.mongodb.net/tecweb-db?retryWrites=true&w=majority');
var userSchema = new mongoose.Schema({
    username: String,
    email: String
}, { collection: 'tecweb-collection' });
module.exports = { Mongoose: mongoose, UserSchema: userSchema }
