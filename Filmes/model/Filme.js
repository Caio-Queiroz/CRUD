const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Filme= new Schema({
    nome: {
        type: String
},
    diretor: {
        type: String
},
    ano: {
        type: Number
},

},{
    collection: 'filme'
});

module.exports = mongoose.model('Filme', Filme);