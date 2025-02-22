import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Table, Tabs, Tab, Modal } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

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
      const response = await axios.get('http://localhost:8080/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
      toast.error('Failed to fetch books. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const book = { title, author, publisher, publishedDate, isbn };
    try {
      if (editBook) {
        await axios.put(`http://localhost:8080/books/${editBook.id}`, { ...book, id: editBook.id });
        toast.success('Book updated successfully!');
      } else {
        await axios.post('http://localhost:8080/books', book);
        toast.success('Book added successfully!');
      }
      fetchBooks();
      resetForm();
      setShowModal(false);
    } catch (error) {
      console.error('Error saving book:', error);
      toast.error('Failed to save the book. Please try again.');
    }
  };

  const handleEdit = (book) => {
    setEditBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setPublisher(book.publisher);
    setPublishedDate(book.publishedDate);
    setIsbn(book.isbn);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/books/${id}`);
      fetchBooks();
      toast.success('Book deleted successfully!');
    } catch (error) {
      console.error('Error deleting book:', error);
      toast.error('Failed to delete the book. Please try again.');
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

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.publisher.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

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

      <Container style={{ marginTop: '-50px', position: 'relative', zIndex: 2, backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
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
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.publisher}</td>
                      <td>{book.publishedDate}</td>
                      <td>{book.isbn}</td>
                      <td>
                        <Button variant="link" size="sm" className="me-2" onClick={() => handleEdit(book)}>
                          <FaEdit style={{ color: 'green' }} />
                        </Button>
                        <Button variant="link" size="sm" onClick={() => handleDelete(book.id)}>
                          <FaTrash style={{ color: 'red' }} />
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
              <Button type="submit" variant="primary">Add Book</Button>
            </Form>
          </Tab>
        </Tabs>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Publisher</Form.Label>
              <Form.Control
                type="text"
                value={publisher}
                onChange={(e) => setPublisher(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Published Date</Form.Label>
              <Form.Control
                type="date"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">Update Book</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default App;