const express = require('express');
const router = express.Router();
const Book = require('../models/books');

//Middleware
const getBook = require('../middleware/bookMiddleware');

//Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    //Status code 500 means something wrong on server/database side
    res.status(500).json({ message: err.message });
  }
});

//Get one book
router.get('/:id', getBook, (req, res) => {
  res.send(res.book);
});

//Create book
router.post('/', async (req, res) => {
  const newBook = new Book({
    name: req.body.name,
    genre: req.body.genre,
    description: req.body.description,
  });

  try {
    const savedBook = await newBook.save();
    //status 201 say books is successfuly saved
    res.status(201).json(savedBook);
  } catch (err) {
    //status 400 says something wrong with user input
    res.status(400).json({ message: err.message });
  }
});

//Update book
router.patch('/:id', getBook, async (req, res) => {
  //Check if user has passed any of these properties
  //If passed then change it and save it to database
  if (req.body.name != null) {
    res.book.name = req.body.name;
  }

  if (req.body.genre != null) {
    res.book.genre = req.body.genre;
  }

  if (req.body.description != null) {
    res.book.description = req.body.description;
  }

  if (req.body.releaseDate != null) {
    res.book.releaseDate = req.body.releaseDate;
  }

  try {
    const updatedBook = await res.book.save();

    res.json({ updatedBook });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

//Delete book
router.delete('/:id', getBook, async (req, res) => {
  try {
    //remove book from database
    await res.book.remove();
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
