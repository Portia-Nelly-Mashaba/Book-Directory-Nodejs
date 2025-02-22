Here’s a professional and comprehensive `README.md` file for your **Book Directory** application. This file provides all the necessary details for setting up, running, and understanding the app.

---

# Book Directory Application

The **Book Directory** is a full-stack application built with **React.js** for the frontend and **Node.js + Express** for the backend. It allows users to manage a directory of books by adding, editing, viewing, and deleting book entries. The data is stored in a JSON file on the server, making it lightweight and easy to use.

---

## Features

### Frontend
- **View Books:** Display all books in a tabular format.
- **Add/Edit Books:** Add new books or update existing ones.
- **Delete Books:** Remove books from the directory.
- **Modern UI:** Built with **React-Bootstrap** for a professional and responsive design.
- **Tabs Interface:** Use tabs to switch between viewing books and adding/editing books.

### Backend
- **REST API:** CRUD operations (Create, Read, Update, Delete) for managing books.
- **JSON Storage:** Data is stored in a `books.json` file.
- **Validation:** Ensures all fields are correctly populated (e.g., ISBN must be a number, title and author cannot be empty).
- **Error Handling:** Returns meaningful HTTP status codes (e.g., 400 Bad Request for validation errors, 404 Not Found if a book does not exist).

---

## Technologies Used

### Frontend
- **React.js**
- **Axios** (for API calls)
- **React-Bootstrap** (for UI components)
- **React Icons** (for icons like edit and delete)

### Backend
- **Node.js**
- **Express.js**
- **CORS** (for cross-origin requests)
- **Body-parser** (for parsing JSON data)

---

## Installation

Follow these steps to set up and run the application locally.

### Prerequisites

- **Node.js** and **npm** installed on your machine.

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Portia-Nelly-Mashaba/Book-Directory-Nodejs.git
   cd book-directory-nodejs
   ```

2. **Set Up the Backend:**
   Navigate to the `backend` folder and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. **Start the Backend Server:**
   Run the backend server:
   ```bash
   node server.js
   ```
   The backend will run on `http://localhost:5000`.

4. **Set Up the Frontend:**
   Open a new terminal window and navigate to the `frontend` folder:
   ```bash
   cd ../frontend
   npm install
   ```

5. **Start the Frontend:**
   Run the React app:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:3000`.

---

## API Endpoints

The backend exposes the following REST API endpoints:

- **GET `/books`**: Fetch all books.
- **GET `/books/:isbn`**: Fetch a specific book by ISBN.
- **POST `/books`**: Add a new book.
- **PUT `/books/:isbn`**: Update an existing book by ISBN.
- **DELETE `/books/:isbn`**: Delete a book by ISBN.

---

## Folder Structure

```
book-directory/
├── backend/
│   ├── node_modules/
│   ├── books.json       # JSON file to store book data
│   ├── package.json
│   ├── package-lock.json
│   └── server.js       # Backend server code
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── App.js      # Main React component
│   │   ├── index.js
│   │   └── ...         # Other React files
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
└── README.md           # This file
```

---

## Screenshots

1. **View Books Tab:**
   ![View Books](https://via.placeholder.com/600x400?text=View+Books)

2. **Add/Edit Book Tab:**
   ![Add/Edit Book](https://via.placeholder.com/600x400?text=Add+Edit+Book)

---

## Testing

### Backend Testing
Use **Postman** or any API testing tool to test the backend endpoints:
- `GET /books`
- `POST /books`
- `PUT /books/:isbn`
- `DELETE /books/:isbn`

### Frontend Testing
Open the app in your browser (`http://localhost:3000`) and interact with the UI to test all features.

---

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Push your branch and submit a pull request.

---


Enjoy using the **Book Directory** application! 📚