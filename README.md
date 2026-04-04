# NoteHive

A secure, full-featured **Notes REST API** built with Node.js, Express and MongoDB. NoteHive lets users sign up, log in, and manage their own personal notes — all protected with JWT authentication.

---

## 🚀 Features

- ✅ User registration and login with encrypted passwords
- ✅ JWT-based authentication and protected routes
- ✅ Full CRUD operations on notes
- ✅ Each note is privately linked to its owner
- ✅ Search notes by name
- ✅ Pagination and sorting support
- ✅ Timestamps on all records

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| dotenv | Environment variable management |

---

## 📁 Project Structure

```
NoteHive/
├── controllers/
│   ├── authController.js     # Signup and login logic
│   └── noteController.js     # CRUD logic for notes
├── middleware/
│   └── authMiddleware.js     # JWT token verification
├── models/
│   ├── userModel.js          # User schema
│   └── noteModel.js          # Note schema
├── routers/
│   ├── authRoutes.js         # Auth endpoints
│   └── noteRoutes.js         # Note endpoints
├── .env                      # Environment variables
├── main.js                   # Entry point
└── package.json
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yasaswini1408/NoteHive.git
cd NoteHive
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
MONGO_URL=your_mongodb_connection_string
```

### 4. Start the server

```bash
node main.js
```

Server runs at `http://localhost:4200`

---

## 📡 API Reference

### Auth Routes

#### Sign Up
```
POST /auth/signup
```
**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```
**Response:**
```json
{
  "_id": "64abc...",
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2026-04-04T10:00:00.000Z"
}
```

---

#### Login
```
POST /auth/login
```
**Request body:**
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Note Routes

> All note routes are **protected**. Include the token in the Authorization header:
> ```
> Authorization: Bearer your_token_here
> ```

---

#### Get All Notes
```
GET /notes
```

**Optional query parameters:**

| Parameter | Type | Description |
|---|---|---|
| search | string | Search notes by name |
| page | number | Page number (default: 1) |
| limit | number | Notes per page |
| sort | string | `asc` or `desc` (default: desc) |

**Example:**
```
GET /notes?search=meeting&page=1&limit=5&sort=asc
```

---

#### Get Note by ID
```
GET /notes/:id
```

---

#### Create a Note
```
POST /notes
```
**Request body:**
```json
{
  "name": "My first note"
}
```
**Response:**
```json
{
  "_id": "64xyz...",
  "name": "My first note",
  "user": "64abc...",
  "createdAt": "2026-04-04T11:00:00.000Z",
  "updatedAt": "2026-04-04T11:00:00.000Z"
}
```

---

#### Update a Note
```
PUT /notes/:id
```
**Request body:**
```json
{
  "name": "Updated note name"
}
```

---

#### Delete a Note
```
DELETE /notes/:id
```
**Response:**
```
Note deleted successfully !
```

---

## 🔐 How Authentication Works

1. User signs up — password is hashed using **bcrypt** before saving
2. User logs in — bcrypt compares the password against the stored hash
3. On success, a **JWT token** is returned
4. For protected routes, the token is sent in the `Authorization` header
5. **authMiddleware** verifies the token on every protected request
6. If valid, the request proceeds — if not, a `401 Unauthorized` is returned

---

## 👨‍💻 Author

Built by **Yasaswini Samala** as a backend learning project using Node.js, Express and MongoDB.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).