const mongoose = require('mongoose')

function categoryModel(){
    const categorySchema = new mongoose.Schema({
        "name": String
      }, {versionKey: false});
    
    return mongoose.model('category', categorySchema, 'Categories');
}

const category = categoryModel()

module.exports = category