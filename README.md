# 🌐 BlogNest

A modern full-stack blogging platform built with the PERN stack (PostgreSQL, Express, React, Node), enhanced with Prisma, JWT cookie-based authentication, and styled by Tailwind CSS.

---

## 🚀 Key Features

- **User Authentication**  
  Sign up, sign in, and stay logged in using JSON Web Tokens stored in secure, HttpOnly cookies.

- **Prisma ORM with Connection Pooling**  
  PostgreSQL access via Prisma + Accelerate/Neon pooler for seamless migrations and efficient queries.

- **JWT + Secure Cookies**  
  Stateless authentication with secure cookie settings (`httpOnly`, `secure`, `sameSite="none"`).

- **Full REST API**  
  User and blog routes including:
  - `POST /signup`  
  - `POST /signin`  
  - `GET /blog/me`  
  - `POST /blog/create`  
  - `GET /blog/all`, etc.

- **Frontend: Vite, React, TypeScript, Tailwind CSS**  
  Fast UI with React Router, responsive design, and clean modular components.

- **Dashboard UI**  
  Personal user dashboard for managing and creating blogs, complete with search and smooth navigation.

- **Global Axios Instance**  
  Pre-configured `axios` with `baseURL` and cross-site credentials support for authenticated API calls.

- **Render Hosting & Proxy Setup**  
  - Backend deployed as Render Web Service  
  - Frontend deployed as Static Site  
  - `/api/*` requests transparently rewritten to backend via proxy rules.

---



