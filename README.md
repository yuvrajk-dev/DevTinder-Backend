# ⚡ DevTinder Backend – Developer Networking API

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express.js](https://img.shields.io/badge/Express.js-Server-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)
![Render](https://img.shields.io/badge/Deployed-Render-black)

The backend API powering **DevTinder**, a developer networking platform inspired by Tinder-style discovery.

It handles **authentication, user profiles, developer discovery, connection requests, request reviews, and developer connections** using a REST API architecture.

🔗 **Frontend Repository:** https://github.com/yuvrajk-dev/DevTinder-Frontend

🔗 **Live Application:** https://devtinder-social.vercel.app

---

## ✨ Features

* 🔐 Secure user authentication with JWT
* 🍪 HTTP-only cookie-based authentication
* 🔑 Password hashing using bcrypt
* 👤 User signup, login, logout, and profile management
* 🔍 Developer discovery feed with pagination
* 🚫 Automatically filters developers the user has already interacted with
* ❤️ Send connection requests
* ❌ Ignore developers
* 🚫 Prevent duplicate connection requests
* 🤝 Accept or reject incoming connection requests
* 👥 View accepted connections
* 📩 View pending incoming connection requests
* 🛡️ Protected API routes using authentication middleware
* ✅ Request and input validation
* 🗄️ MongoDB database integration with Mongoose
* 🌐 CORS configuration for frontend-backend communication
* ⚠️ Error handling for invalid requests and resources

---

## 🛠️ Tech Stack

| Category          | Technology |
| ----------------- | ---------- |
| Runtime           | Node.js    |
| Framework         | Express.js |
| Database          | MongoDB    |
| ODM               | Mongoose   |
| Authentication    | JWT        |
| Password Security | bcrypt     |
| Deployment        | Render     |
| API Testing       | Postman    |

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yuvrajk-dev/DevTinder-Backend.git
cd DevTinder-Backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=7777

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

### 4. Start the development server

```bash
npm run dev
```

The server will start on:

```text
http://localhost:7777
```

---

# 🔌 API Functionality

## 🔐 Authentication

The API supports:

* User signup
* User login
* User logout
* JWT generation and verification
* HTTP-only cookie authentication

---

## 👤 User Profiles

Authenticated users can:

* View their profile
* Edit profile information
* Access protected user routes

---

## 🔍 Developer Feed

The feed returns developers that the logged-in user has **not already interacted with**.

Users involved in previous connection requests are filtered from the feed to prevent repeated profiles and duplicate interactions.

The feed also supports pagination using query parameters.

Example:

```text
/feed?page=1&limit=10
```

---

## ❤️ Connection Requests

Users can send two types of interactions:

```text
interested
ignored
```

The API validates requests to prevent:

* Invalid request statuses
* Requests to yourself
* Invalid user IDs
* Requests to non-existent users
* Duplicate connection requests

---

## 🤝 Reviewing Requests

Users receiving an **interested** request can review it with:

```text
accepted
rejected
```

Only the intended recipient of a pending request can review that request.

---

## 👥 Connections

The API allows users to retrieve:

* Accepted developer connections
* Pending incoming connection requests

Connection data is populated with developer profile information for frontend consumption.

---

## 🔒 Security

DevTinder implements several security and validation practices:

* JWT-based authentication
* HTTP-only cookies
* Password hashing with bcrypt
* Protected routes with authentication middleware
* Input validation
* MongoDB ObjectId validation
* Request status validation
* Authorization checks before reviewing requests
* CORS configuration

---

## 💡 Why I Built This

I built the DevTinder backend to strengthen my understanding of **backend development and real-world REST API architecture**.

The project focuses on how a networking application manages:

* User authentication
* Protected resources
* Database relationships
* Connection workflows
* Request validation
* Authorization
* Developer discovery

Building this project gave me hands-on experience with **Node.js, Express.js, MongoDB, Mongoose, JWT authentication, middleware, and REST API design**.

---

## 🌐 Deployment

The backend API is deployed on **Render** and serves the REST APIs consumed by the DevTinder React frontend.

🔗 **Live Application:** https://devtinder-social.vercel.app

---

## 👨‍💻 Author

**Yuvraj Kumar**

* GitHub: https://github.com/yuvrajk-dev
* LinkedIn: https://linkedin.com/in/yuvrajkumar01
* Portfolio: https://yuvrajk-dev.vercel.app
