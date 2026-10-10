# Library Management System

> **Course Assignment:** Assignment 4 — CRUD with Client-Side Rendering  
> **Project ID:** 2  
> **Repository:** [library-management-system](https://github.com/karkichtn/library-management-system)

---

## 📖 Project Overview

The **Library Management System** is a full-stack web application designed to streamline library cataloging, user management, and book issue/return tracking. Built as part of **Assignment 4 (CRUD with Client-Side Rendering)**, this application leverages a decoupled client-server architecture featuring a modern React Single Page Application (SPA) on the frontend and an Express/Node.js REST API with MongoDB Atlas on the backend.

> [!NOTE]  
> **Current Status: Project Setup & Baseline Scaffolding**  
> At this stage, the repository contains the project foundation, directory architecture, environment templates, and task definitions. Application features (authentication, book management, borrowing tracking) are planned and tracked via GitHub Issues; implementation will commence following team task allocation.

---

## 👥 Project Team

| # | Role | Name / GitHub Handle | Responsibilities / Assigned Task |
|---|---|---|---|
| 1 | **Team Lead** | Chetan Singh ([@karkichtn](https://github.com/karkichtn)) | • Project management and task delegation<br>• Architecture and project configuration<br>• [Issue #1](https://github.com/karkichtn/library-management-system/issues/1) — Project Foundation and Authentication<br>• [Issue #5](https://github.com/karkichtn/library-management-system/issues/5) — Backend Error Handling and Automated API Tests |
| 2 | **Backend Developer** | Deepesh Shikarwar *(Pending confirmation)* | • [Issue #2](https://github.com/karkichtn/library-management-system/issues/2) — Book Model and Read APIs<br>• [Issue #6](https://github.com/karkichtn/library-management-system/issues/6) — Book Write APIs |
| 3 | **Frontend Developer** | Jagjeet *(Pending confirmation)* | • [Issue #3](https://github.com/karkichtn/library-management-system/issues/3) — React Book Catalogue<br>• [Issue #7](https://github.com/karkichtn/library-management-system/issues/7) — Book Search, Filters, and Forms |
| 4 | **Issue/Return Feature Developer** | Lanchanba *(Pending confirmation)* | • [Issue #4](https://github.com/karkichtn/library-management-system/issues/4) — Book Issue and Return Backend<br>• [Issue #8](https://github.com/karkichtn/library-management-system/issues/8) — Book Issue/Return Interface |

---

## 🛠️ Technology Stack

### Frontend
- **Library/Framework:** [React.js](https://react.dev/) (v18+)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Routing:** React Router DOM (v6+)
- **HTTP Client:** Axios
- **Styling:** CSS3 (Modern Responsive Flexbox/Grid)
- **Deployment Platform:** [Vercel](https://vercel.com/) *(Planned)*

### Backend
- **Runtime:** [Node.js](https://nodejs.org/) (ES Modules)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) with [Mongoose](https://mongoosejs.com/) ODM
- **Authentication:** JSON Web Tokens (JWT) & `bcryptjs` for password hashing
- **Deployment Platform:** Node.js Cloud Hosting (Render / Railway) *(Planned)*

### DevOps & Collaboration
- **Version Control:** Git & GitHub
- **Workflow:** Feature Branching, Pull Requests (PRs), and GitHub Issues
- **Issue Tracking:** GitHub Project Issues

---

## 🎯 Feature Roadmap & Implementation Status

| Module / Feature | Description | Status |
|---|---|---|
| **Repository Scaffolding** | Directory structure, package configuration, and baseline setup | ✅ **Complete** |
| **Project Foundation and Authentication** | User registration/login, JWT tokens, Role-Based Access Control (`Admin`/`Librarian` vs `Student`) | 📋 *Planned ([Issue #1](https://github.com/karkichtn/library-management-system/issues/1))* |
| **Book Model and Read APIs** | Mongoose schema, book retrieval (`GET /api/books`, `GET /api/books/:id`), search and category filters | 📋 *Planned ([Issue #2](https://github.com/karkichtn/library-management-system/issues/2))* |
| **React Book Catalogue** | Client-side catalogue display, reusable book cards/table, loading, empty, and error states | 📋 *Planned ([Issue #3](https://github.com/karkichtn/library-management-system/issues/3))* |
| **Book Issue and Return Backend** | Borrowing record model, issue and return APIs, availability tracking, and role validation | 📋 *Planned ([Issue #4](https://github.com/karkichtn/library-management-system/issues/4))* |
| **Backend Error Handling and Automated API Tests** | Centralized Express error-handling middleware, uniform JSON error format, and automated API test suite | 📋 *Planned ([Issue #5](https://github.com/karkichtn/library-management-system/issues/5))* |
| **Book Write APIs** | Mutation endpoints (`POST`, `PUT`, `DELETE /api/books`), input validation, and librarian authorization | 📋 *Planned ([Issue #6](https://github.com/karkichtn/library-management-system/issues/6))* |
| **Book Search, Filters, and Forms** | Live search, category filtering, controlled Add/Edit book forms, and role-based controls | 📋 *Planned ([Issue #7](https://github.com/karkichtn/library-management-system/issues/7))* |
| **Book Issue/Return Interface** | React borrowing/return interface, student loan tracking, and librarian management views | 📋 *Planned ([Issue #8](https://github.com/karkichtn/library-management-system/issues/8))* |

---

## 📡 Planned API Endpoints

The backend will expose the following RESTful API routes:

### Authentication & Profiles (`/api/auth`)
- `POST /api/auth/register` — Register a new student or librarian account
- `POST /api/auth/login` — Authenticate credentials and return signed JWT token
- `GET /api/auth/me` — Retrieve the profile of the currently authenticated user

### Book Management (`/api/books`)
- `GET /api/books` — Retrieve all books (supports query parameters: `search`, `category`, `available`)
- `GET /api/books/:id` — Retrieve detailed record for a specific book
- `POST /api/books` — Add a new book *(Restricted: Admin/Librarian)*
- `PUT /api/books/:id` — Update an existing book's details *(Restricted: Admin/Librarian)*
- `DELETE /api/books/:id` — Remove a book from the catalog *(Restricted: Admin/Librarian)*

### Issue & Return Records (`/api/issues`)
- `POST /api/issues/issue` — Issue a book to a registered student *(Restricted: Admin/Librarian)*
- `POST /api/issues/return/:id` — Process the return of an issued book *(Restricted: Admin/Librarian)*
- `GET /api/issues/my-borrowed` — List books currently borrowed by the authenticated student
- `GET /api/issues/all` — Retrieve complete borrowing history *(Restricted: Admin/Librarian)*

### Health Check (`/api/health`)
- `GET /api/health` — Service health check and uptime monitor (Implemented)

---

## 📁 Repository Directory Structure

```text
library-management-system/
├── frontend/                   # React + Vite Frontend Application
│   ├── public/                 # Static public assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # View pages (Login, Catalogue, Dashboard, etc.)
│   │   ├── services/           # Axios API service callers
│   │   ├── hooks/              # Custom React hooks
│   │   ├── App.jsx             # Main application wrapper
│   │   ├── index.css           # Global stylesheet
│   │   └── main.jsx            # React root mount point
│   ├── index.html              # HTML document template
│   ├── package.json            # Frontend dependency manifest
│   ├── vite.config.js          # Vite build tool configuration
│   └── .env.example            # Frontend environment variable template
├── backend/                    # Node.js + Express REST API Server
│   ├── src/
│   │   ├── config/             # DB & environment configuration
│   │   ├── controllers/        # Request handling and business logic
│   │   ├── middleware/         # Auth, validation, and error handlers
│   │   ├── models/             # Mongoose schemas & data models
│   │   ├── routes/             # Express API routing definitions
│   │   ├── utils/              # Helper utilities
│   │   └── server.js           # Express app bootstrap & entry point
│   ├── package.json            # Backend dependency manifest
│   └── .env.example            # Backend environment variable template
├── .gitignore                  # Git ignore rules for node_modules, .env, and builds
└── README.md                   # Project documentation
```

---

## ⚙️ Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) (v9.0.0 or higher)
- [Git](https://git-scm.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or local MongoDB daemon)

### 1. Clone the Repository
```bash
git clone https://github.com/karkichtn/library-management-system.git
cd library-management-system
```

### 2. Backend Setup
1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your local environment configuration:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your MongoDB connection string and a secure JWT secret:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/library_db?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret_key_here
   CLIENT_URL=http://localhost:5173
   ```
5. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The server will start on `http://localhost:5000` (Health check at `http://localhost:5000/api/health`).*

### 3. Frontend Setup
1. From the project root, navigate to the `frontend/` directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your local environment configuration:
   ```bash
   cp .env.example .env
   ```
4. Verify the backend API URL in `.env`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```
5. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client application will start on `http://localhost:5173`.*

---

## 🔐 Environment Variables Summary

### Backend (`backend/.env`)
| Variable | Description | Example |
|---|---|---|
| `PORT` | Port for the Express server to listen on | `5000` |
| `NODE_ENV` | Application environment mode | `development` |
| `MONGODB_URI` | MongoDB Atlas cluster connection URI | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key used to sign and verify JSON Web Tokens | `your_secret_key` |
| `CLIENT_URL` | Frontend origin URL for CORS configuration | `http://localhost:5173` |

### Frontend (`frontend/.env`)
| Variable | Description | Example |
|---|---|---|
| `VITE_API_BASE_URL` | Base endpoint URL for backend REST API requests | `http://localhost:5000/api` |

---

## 🖼️ Application Screenshots

*Screenshots will be added once feature development and UI components are integrated.*

- **Authentication View (Login / Register):** *[Pending Feature Implementation]*
- **Book Catalogue & Search Filter:** *[Pending Feature Implementation]*
- **Admin Management Dashboard:** *[Pending Feature Implementation]*
- **Borrowing Records / Issue Tracking:** *[Pending Feature Implementation]*

---

## 🚀 Deployment Links

- **Frontend Deployment (Vercel):** *[Pending Deployment]* (Placeholder: `https://library-management-system-frontend.vercel.app`)
- **Backend Deployment (Cloud Service):** *[Pending Deployment]* (Placeholder: `https://library-management-system-api.onrender.com`)

---

## 📜 Academic Integrity & License

This project is developed solely for educational purposes as part of **Assignment 4 — CRUD with Client-Side Rendering**. All rights reserved by the project team.
