import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table, Tabs, Tab, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [isbn, setIsbn] = useState('');
  const [editBook, setEditBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://localhost:5000/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const book = { title, author, publisher, publishedDate, isbn };
    try {
      if (editBook) {
        await axios.put(`https://localhost:5000/books/${editBook.isbn}`, book);
      } else {
        await axios.post('https://localhost:5000/books', book);
      }
      fetchBooks();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setPublisher('');
    setPublishedDate('');
    setIsbn('');
    setEditBook(null);
  };

  // Filter books based on the search term
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{
        backgroundImage: 'linear-gradient(206.57deg, #2F93E2a3 0%, #0C4470 100%), url(https://images.pexels.com/photos/12124094/pexels-photo-12124094.jpeg?auto=compress&cs=tinysrgb&w=600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
          <h1>Welcome to Book Directory</h1>
          <Form.Control
            type="text"
            placeholder="Search for books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '300px', margin: '10px auto', borderRadius: '5px', padding: '10px' }}
          />
        </div>
      </div>

      <Container style={{ marginTop: '-50px', position: 'relative', zIndex: 2, backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
        <Tabs defaultActiveKey="view" id="book-tabs" className="mb-3">
          <Tab eventKey="view" title="View Books">
            {filteredBooks.length === 0 ? (
              <p style={{ textAlign: 'center', fontSize: '18px', color: 'gray' }}>No books match your search.</p>
            ) : (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Published Date</th>
                    <th>ISBN</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book.isbn}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.publisher}</td>
                      <td>{book.publishedDate}</td>
                      <td>{book.isbn}</td>
                      <td>
                        <Button variant="warning" size="sm" className="me-2">
                          <FaEdit />
                        </Button>
                        <Button variant="danger" size="sm">
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Tab>
          <Tab eventKey="add" title="Add Book">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Publisher</Form.Label>
                <Form.Control type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Published Date</Form.Label>
                <Form.Control type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} required />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ISBN</Form.Label>
                <Form.Control type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
              </Form.Group>
              <Button type="submit" variant="primary">{editBook ? 'Update Book' : 'Add Book'}</Button>
            </Form>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default App;
