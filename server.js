const express = require('express');
const app = express();
const mongoose = require('mongoose');
const booksRouter = require('./routes/books');

//configure environment variables
require('dotenv').config();

//connect mongodb
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Check the connection to database
const db = mongoose.connection;
db.on('error', (error) => {
  console.error(error);
});
db.once('open', () => console.log('connected to database'));

//port
const port = process.env.PORT || 3000;

//allow server to access json
app.use(express.json());

//base router
const baseRouter = express.Router();

//Every route will pass through this route
app.use('/api/v1', baseRouter);

//Routes
baseRouter.use('/books', booksRouter);

//start server
app.listen(port, () => {
  console.log(`server has started on port ${port}`);
});
