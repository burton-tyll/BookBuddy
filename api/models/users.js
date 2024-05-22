const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    favorites: [
      {
        bookId: String
      }
    ],
    whishlist: [
      {
        bookId: String
      }
    ],
    reading: [
      {
        bookId: String,
        currentPage: String
      }
    ],
    finished: [
      {
        bookId: String
      }
    ],
    connected: Boolean,
});

module.exports = mongoose.model('User', userSchema, 'Users');
