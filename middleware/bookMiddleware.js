const Book = require('../models/books');

const getBook = async (req, res, next) => {
  let book;
  try {
    book = await Book.findById(req.params.id);

    //Check if book exist
    if (book == null) {
      return res.status(404).json({ message: 'can not find the book' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  //Set book object so that it can be used in routes
  res.book = book;
  next(); //move to next step (routes)
};

module.exports = getBook;
