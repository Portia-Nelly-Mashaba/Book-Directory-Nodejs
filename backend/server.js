const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for books
let books = [];

// Validation function
const validateBook = (book) => {
  if (!book.title || !book.author || !book.publisher || !book.publishedDate || !book.isbn) {
    return 'All fields are required.';
  }
  if (isNaN(book.isbn)) {
    return 'ISBN must be a number.';
  }
  return null;
};

// CRUD Endpoints

// GET all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET a book by ISBN
app.get('/books/:isbn', (req, res) => {
  const book = books.find((b) => b.isbn === req.params.isbn);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found.' });
  }
});

// POST a new book
app.post('/books', (req, res) => {
  const newBook = req.body;
  const error = validateBook(newBook);
  if (error) {
    return res.status(400).json({ message: error });
  }
  if (books.find((b) => b.isbn === newBook.isbn)) {
    return res.status(400).json({ message: 'Book with this ISBN already exists.' });
  }
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT/PATCH update a book
app.put('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const updatedBook = req.body;
  const error = validateBook(updatedBook);
  if (error) {
    return res.status(400).json({ message: error });
  }
  const index = books.findIndex((b) => b.isbn === isbn);
  if (index !== -1) {
    books[index] = updatedBook;
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: 'Book not found.' });
  }
});

// DELETE a book
app.delete('/books/:isbn', (req, res) => {
  const isbn = req.params.isbn;
  const initialLength = books.length;
  books = books.filter((b) => b.isbn !== isbn);
  if (books.length < initialLength) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Book not found.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});