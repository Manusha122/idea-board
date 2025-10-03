# Idea Board

A modern, real-time idea sharing platform with a beautiful landing page and interactive idea board. Share, upvote, and discuss ideas with text formatting and image support.

## 🚀 Features

### Interactive Landing Page

- Animated gradient hero section with floating blobs
- Feature showcase with entrance animations
- Real-time preview of latest ideas
- Responsive design for all devices
- Engaging call-to-action buttons
- Smooth page transitions

### Dynamic Idea Board

- Rich text editing with markdown support
  - Bold, italic, and underline formatting
  - Keyboard shortcuts support
  - Toolbar interface

- Image upload capabilities
  - Drag & drop support
  - Auto-resizing to 150px × 75px thumbnails
  - Preview before upload

- Real-time collaborative features
  - Live updates with 3s polling
  - Optimistic UI updates
  - Upvote system with animations

- User-friendly interface
  - Edit and delete functionality
  - Character counter (280 max)
  - Responsive grid layout
  - Error handling with feedback

## 🛠️ Tech Stack

### Frontend Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client
- **CSS Animations** - Custom animations and transitions

### Backend Technologies

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

### DevOps Tools

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy for frontend

## 📋 Prerequisites

- Node.js 18+ installed
- MongoDB installed locally (for development)
- Docker and Docker Compose (for production)
- Git

## 🔧 Installation

### Setting Up Your Local Environment

1. Clone the repository:

    ```bash
    git clone https://github.com/Manusha122/idea-board.git
    cd idea-board
    ```

### Development Environment Setup

1. Start the backend server:

    ```bash
    cd backend
    npm install
    
    # Ensure MongoDB is running locally
    npm run dev
    ```

    The API server will be available at `http://localhost:4000`

2. Launch the frontend development server:

    ```bash
    cd frontend
    npm install
    npm run dev
    ```

    The development server will be available at `http://localhost:5173`

## 🔌 API Documentation

### Available Endpoints

- `GET /api/ideas` - Retrieve all ideas
- `POST /api/ideas` - Create a new idea
  - Body: `{ text: string, image?: File }`
- `PUT /api/ideas/:id` - Update an existing idea
  - Body: `{ text: string }`
- `DELETE /api/ideas/:id` - Remove an idea
- `POST /api/ideas/:id/upvote` - Add upvote to an idea

## 💻 Development Guide

### Project Architecture

```plaintext
idea-board/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   └── main.jsx      # Entry point
│   └── package.json
├── backend/              # Express backend
│   ├── src/
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   └── server.js     # Entry point
│   └── package.json
└── docker-compose.yml    # Docker services config
```

### Configuration Files

#### Frontend Environment (.env)

```properties
VITE_API_BASE_URL=http://localhost:4000/api
```

#### Backend Environment (.env)

```properties
PORT=4000
MONGO_URL=mongodb://localhost:27017/ideaboard
```

## 🚀 Production Deployment

1. Configure production environment:

    ```bash
    # Update production environment variables
    nano frontend/.env.production
    nano backend/.env.production
    ```

2. Build and deploy with Docker:

    ```bash
    docker-compose up --build -d
    ```

## 👥 Contributing

We welcome contributions that help improve the Idea Board! Here's how you can help:

### Development Process

1. Fork the repository
2. Create a feature branch:

    ```bash
    git checkout -b feature/amazing-feature
    ```

3. Make your changes and commit:

    ```bash
    git commit -m 'Add amazing feature'
    ```

4. Push to your fork:

    ```bash
    git push origin feature/amazing-feature
    ```

5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Be respectful and constructive in discussions



## 📝 Contributing

1. Fork the repository
2. Create your feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit your changes: \`git commit -m 'Add amazing feature'\`
4. Push to the branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request
"# Idea-Board" 
"# Idea-Board" 
"# idea-board" 
