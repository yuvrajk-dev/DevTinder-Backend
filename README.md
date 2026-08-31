# ⚡ DevTinder Backend – Developer Networking API

![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![Express.js](https://img.shields.io/badge/Express.js-Server-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Mongoose](https://img.shields.io/badge/Mongoose-ODM-red)
![JWT](https://img.shields.io/badge/Auth-JWT-blue)

The backend API powering **DevTinder**, a Tinder-inspired networking platform for developers. It handles authentication, user profiles, developer discovery, connection requests, and user connections.

---

## ✨ Features

- 🔐 Secure user authentication
- 🔑 Password hashing and secure credential handling
- 🍪 Authentication using JWT and cookies
- 👤 User profile creation and management
- 🔍 Developer feed for discovering new developers
- ❤️ Send connection requests
- ❌ Ignore developers
- 🤝 Accept or reject incoming requests
- 👥 View accepted developer connections
- 🛡️ Protected API routes
- 🚫 Request validation and error handling
- 🗄️ MongoDB database integration using Mongoose

---

## 🛠️ Tech Stack

| Category       | Technology |
| -------------- | ---------- |
| Runtime        | Node.js    |
| Framework      | Express.js |
| Database       | MongoDB    |
| ODM            | Mongoose   |
| Authentication | JWT        |
| Security       | bcrypt     |
| Deployment     | Render     |

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/yuvrajk-dev/YOUR-BACKEND-REPO.git
cd YOUR-BACKEND-REPO
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
PORT=7777

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
```

### Start the development server

```bash
npm run dev
```

---

## 🔌 API Functionality

The API supports functionality for:

- User signup and login
- User authentication and logout
- Viewing and editing user profiles
- Fetching developer feeds
- Sending connection or ignore requests
- Accepting or rejecting connection requests
- Viewing pending connection requests
- Viewing accepted developer connections

---

## 💡 Why I Built This

I built the DevTinder backend to strengthen my understanding of **backend development, REST APIs, authentication, database modeling, and request handling**.

The project demonstrates how a real-world social networking application can manage users, authentication, relationships between users, and connection workflows using **Node.js, Express.js, MongoDB, and Mongoose**.

---

## 🚀 Deployment

The backend API is deployed on Render.

---

## 👨‍💻 Author

**Yuvraj Kumar**

- GitHub: https://github.com/yuvrajk-dev
- LinkedIn: https://linkedin.com/in/yuvrajkumar01
