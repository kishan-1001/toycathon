# Toycathon

A full-stack web application for sharing adventures and thoughts through blogs, with user authentication, liking, and commenting features.

## Features

- User registration and login
- Create and view blog posts
- Like and comment on blog posts
- Responsive UI with animations
- Real-time optimistic updates

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- bcrypt for password hashing

### Frontend
- React
- Framer Motion for animations
- Axios for API calls
- Tailwind CSS for styling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd toycathon
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

## Setup

1. Set up MongoDB:
   - Install MongoDB locally or use a cloud service
   - Create a database named `toycathon`

2. Configure environment variables:
   - In the `backend` directory, create a `.env` file:
     ```
     MONGO_URI=mongodb://localhost:27017/toycathon
     PORT=5000
     ```
   - Replace the MONGO_URI with your MongoDB connection string if using a cloud service

3. Firebase credentials (optional):
   - The project includes Firebase credentials, but they are not currently used in the codebase

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   The server will run on http://localhost:5000

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```
   The app will open in your browser at http://localhost:3000

## Project Structure

```
toycathon/
├── backend/
│   ├── models/
│   │   ├── Blog.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── blog.js
│   ├── firebase-credentials.json
│   ├── index.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AnimatedBackground.jsx
│   │   │   ├── AuthButton.jsx
│   │   │   ├── AvatarModel.jsx
│   │   │   ├── Chatbot.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── RoleSelector.jsx
│   │   │   └── AdventureDoors.jsx
│   │   ├── pages/
│   │   │   ├── Blog.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Welcome.jsx
│   │   ├── App.jsx
│   │   ├── firebase.js
│   │   ├── index.css
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
├── README.md
└── TODO.md
```

## API Documentation

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user

### Blogs
- `GET /api/blogs` - Get all blogs
- `POST /api/blogs` - Create a new blog (requires authentication)
- `POST /api/blogs/:id/like` - Like or unlike a blog (requires authentication)
- `POST /api/blogs/:id/comment` - Add a comment to a blog (requires authentication)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
