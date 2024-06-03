const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const subSchemaOptions = {
  _id: false
};

const favoriteSchema = new mongoose.Schema({
  bookId: String
}, subSchemaOptions);

const wishlistSchema = new mongoose.Schema({
  bookId: String
}, subSchemaOptions);

const readingSchema = new mongoose.Schema({
  bookId: String,
  currentPage: String
}, subSchemaOptions);

const finishedSchema = new mongoose.Schema({
  bookId: String
}, subSchemaOptions);

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  email: { type: String, required: true }, // Email est obligatoire
  password: { type: String, required: true }, // Mot de passe est obligatoire
  connected: { type: Boolean, default: true },
  favorites: [favoriteSchema],
  wishlist: [wishlistSchema],
  reading: [readingSchema],
  finished: [finishedSchema]
}, { versionKey: false });


// Avant de sauvegarder l'utilisateur, hachez son mot de passe
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Ajoute une méthode pour comparer les mots de passe hachés
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', userSchema, 'Users');

module.exports = User;
