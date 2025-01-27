
const express = require('express');
const Book = require('../Controller/Book_controller.js');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const freeBooks = await Book.find({ category: 'Free' });
    res.status(200).json(freeBooks);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
