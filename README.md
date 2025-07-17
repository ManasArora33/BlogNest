# 🌐 BlogNest: A Full-Stack Blogging Platform

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

BlogNest is a modern, full-stack blogging platform built with the PERN stack (PostgreSQL, Express, React, Node.js). It features a secure, cookie-based JWT authentication system, a powerful Prisma ORM setup for database management, and a sleek, responsive UI crafted with Tailwind CSS.

---

## ✨ Key Features

- **Secure User Authentication**: Robust signup and signin functionality using JSON Web Tokens (JWT) stored in secure, `HttpOnly` cookies.
- **Efficient Database Management**: Utilizes Prisma ORM with connection pooling (via Neon/Accelerate) for efficient database queries and seamless migrations.
- **RESTful API**: A comprehensive set of API endpoints for managing users and blog posts.
- **Modern Frontend**: A fast and responsive user interface built with Vite, React, and TypeScript, styled with Tailwind CSS.
- **User Dashboard**: A dedicated dashboard for users to create, view, and manage their blog posts.
- **Centralized API Configuration**: A pre-configured global Axios instance simplifies authenticated API requests from the frontend.
- **Ready for Deployment**: Configured for easy deployment with services like Render, including a proxy setup for the backend API.

---

## 🛠️ Tech Stack

| Area      | Technologies                                       |
| :-------- | :------------------------------------------------- |
| **Backend** | Node.js, Express, TypeScript, PostgreSQL, Prisma, Zod |
| **Frontend**| Vite, React, TypeScript, Tailwind CSS, Axios, React Router |
| **Auth**    | JWT (JSON Web Tokens), Secure `HttpOnly` Cookies   |

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm
- A running PostgreSQL database instance

### 1. Clone the Repository

```bash
git clone https://github.com/ManasArora33/BlogNest.git
cd BlogNest
```

### 2. Backend Setup

Navigate to the backend directory and install the dependencies.

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following environment variables. Replace the placeholder values with your actual database connection string and a strong JWT secret.

```env
# Example .env
DATABASE_URL="YourPrismaAccelerateDatabaseURL"
DIRECT_DATABASE_URL="YourPostgresDatabaseURLCloudInstance"
JWT_SECRET="your-super-secret-jwt-key"
```

Run the database migrations to set up your database schema.

```bash
npx prisma migrate dev
npx prisma generate
```

Start the backend server.

```bash
npm run dev
```
The backend will be running on `http://localhost:3000`.

### 3. Frontend Setup

In a new terminal, navigate to the frontend directory and install the dependencies.

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory and add the following environment variable to point to your backend API.

```env
# Example .env
VITE_API_BASE_URL="http://localhost:3000"
```

Start the frontend development server.

```bash
npm run dev
```
The frontend will be running on `http://localhost:5173`.

---

## 📝 API Endpoints

The backend exposes the following REST API endpoints:

| Method | Endpoint              | Description                     |
| :----- | :-------------------- | :------------------------------ |
| `POST` | `/api/v1/user/signup` | Register a new user.            |
| `POST` | `/api/v1/user/signin` | Log in an existing user.        |
| `GET`  | `/api/v1/user/signout`| Sign out from your account.        |
| `POST` | `/api/v1/blog/`       | Create a new blog. |
| `PUT`  | `/api/v1/blog/`       | Edit the current blog. |
| `GET`  | `/api/v1/blog/bulk/all`    | Get all blog posts.             |
| `GET`  | `/api/v1/blog/bulk/`    | Get all blog posts by the user.             |
| `GET`  | `/api/v1/blog/me`     | Get details of the current user. |
| `GET`  | `/api/v1/blog/:id`    | Get a specific blog post by ID. |
| `DELETE`  | `/api/v1/blog/:id`    | Delete a specific blog post by ID. |

---

## ☁️ Deployment

- **Backend**: Deployed as a Web Service on Render.
- **Frontend**: Deployed as a Static Site on Render.
- **Proxy**: Render's proxy is configured to rewrite requests from `/api/*` on the frontend to the backend service to avoid CORS issues.

---