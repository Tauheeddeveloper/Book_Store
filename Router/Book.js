const mongoose = require('mongoose');

// Book schema definition
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true }
});

// Model creation
const Book = mongoose.model('Book', bookSchema);

// Export model for use
module.exports = Book;
