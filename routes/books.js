const express = require('express');

const router = express.Router();

//Get all books
router.get('/', (req, res) => {
  res.send('Hello World');
});

//Get one book
router.get('/:id', (req, res) => {
  res.send(req.params.id);
});

//Create book
router.post('/', (req, res) => {});

//Update book
router.patch('/:id', (req, res) => {});

//Delete book
router.delete('/:id', (req, res) => {});

module.exports = router;
