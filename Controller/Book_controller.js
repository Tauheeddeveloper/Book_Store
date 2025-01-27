const Book = require('../Router/Book.js');

const getbook = async (req, res) => {
  try {
    // Use the Book model to query the database
    const books = await Book.find();
    res.status(200).json(books); // Corrected typo: 'jsson' -> 'json'
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

module.exports = getbook;
