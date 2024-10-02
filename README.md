# BookNest

## Description
**BookNest** is a comprehensive full-stack web application developed using the PERN stack (PostgreSQL, Express.js, React.js, and Node.js). It functions as an online book shop where users can effortlessly browse, search, and purchase a wide array of books. Additionally, BookNest features a dynamic blogging platform that allows users to read and create posts on various literary topics, enhancing the community aspect of the platform.

## Features
- **User Authentication:** Secure user registration and login using JWT.
- **Bookstore:** Browse, search, and purchase books with ease.
- **Blog Section:** Read and create blog posts about books, authors, and literary trends.
- **User Profiles:** Personalized user dashboard displaying user information and activity.
- **Shopping Cart:** Add books to the cart and manage purchases seamlessly.
- **Reviews and Ratings:** Users can submit reviews and ratings for books.
- **Admin Dashboard:** Manage books, posts, and user data efficiently.

## Technologies Used
- **Frontend:**
  - React.js
  - React Router
  - Axios for API requests
  - Tailwind for styling
- **Backend:**
  - Node.js
  - Express.js
  - JWT for authentication
  - Multer for file uploads
- **Database:**
  - PostgreSQL
- **Environment Variables:**
  - dotenv for managing sensitive data

## Installation

Follow these steps to set up the BookNest application on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Manish312002/-BOOKNEST-Ultimate-Online-Bookstore-and-Literary-Community.git
   cd -BOOKNEST-Ultimate-Online-Bookstore-and-Literary-Community

2. **Install backend dependencies:**
   ```bash
   cd server
   npm i

3. **Install frontend dependencies:**
   ```bash
   cd ../client
   npm i

4. **Set up environment variables: Create a .env file in the backend directory with the following content:**

  -  PG_USER=your_username
  -  PG_PASSWORD=your_password
  -  PG_DATABASE=your_database
  -  PG_HOST=localhost
  -  PG_PORT=5432
  -  SECRET=your_jwt_secret

5. **Run the backend server:**
   ```bash
   cd ../server
   nodemon server.js

6. **Run the frontend application:**
   ```bash
   cd ../client
   npm run dev

## Usage

- Access the backend API at [http://localhost:4000](http://localhost:4000) to explore various endpoints.
- Access the frontend application at [http://localhost:5173](http://localhost:5173) to interact with the user interface.
- Register a new account, log in, browse books, and create blog posts.

## API Endpoints

### User Authentication:
- **POST** `/register`: Register a new user
- **POST** `/login`: Log in an existing user
- **GET** `/profile`: Get user profile information

### Books:
- **GET** `/books`: Get a list of books
- **POST** `/upload-book`: Add a new book
- **PATCH** `/book/update/:id`: Update book details
- **DELETE** `/book/delete/:id`: Remove a book

### Blog Posts:
- **GET** `/posts`: Get all blog posts
- **POST** `/dashboard/upload-post`: Create a new blog post
- **PATCH** `/post/update/:id`: Update a blog post
- **DELETE** `/post/delete/:id`: Delete a blog post

### Cart Management:
- **GET** `/shop/cart`: Get the user's shopping cart
- **POST** `/shop/cart`: Add an item to the cart
- **DELETE** `/cart/delete/:id`: Remove an item from the cart

### Reviews:
- **GET** `/reviews`: Get all reviews
- **POST** `/review`: Submit a review for a book

### Dashboard:
- **GET** `/dashboard/user`: Get the user
- **GET** `/dashboard/books`: Get user uploaded books
- **GET** `/dashboard/posts`: Get user uploaded posts
- **POST** `/dashboard/logout`: Log out user

## Conclusion
  - BookNest provides a robust platform for book lovers to explore literature and engage with a community of like-minded individuals. With user-friendly features and a modern tech stack, it's the perfect place to buy books and share literary insights. Enjoy your reading journey!
