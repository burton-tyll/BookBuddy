const mongoose = require('mongoose')

function genreModel(){
    const genreSchema = new mongoose.Schema({
        "name": String
      }, {versionKey: false});
    
    return mongoose.model('genre', genreSchema, 'Genres');
}

const genre = genreModel()

module.exports = genre