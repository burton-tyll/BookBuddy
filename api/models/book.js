const mongoose = require('mongoose')

function bookModel(){
    const bookSchema = new mongoose.Schema({
        "title": String,
        "img": String,
        "author": String,
        "pages": Number,
        "category": String,
        "genre": String,
        "description": String
      }, {versionKey: false});
    
    return mongoose.model('book', bookSchema, 'Books');
}

const book = bookModel()

module.exports = book




