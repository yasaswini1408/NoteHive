# NoteHive

A secure, full-featured **full stack Notes App** built with Node.js, Express, MongoDB and vanilla JavaScript. NoteHive lets users sign up, log in, and privately manage their own notes — all protected with JWT authentication.

🌐 **Live Demo** → [notehive365.netlify.app](https://notehive365.netlify.app)

---

## 🚀 Features

- ✅ User registration and login with encrypted passwords
- ✅ JWT-based authentication and protected routes
- ✅ Full CRUD operations on notes (Create, Read, Update, Delete)
- ✅ Each note is privately linked to its owner
- ✅ Search notes by name
- ✅ Pagination and sorting support
- ✅ Timestamps on all records
- ✅ Clean and responsive frontend UI
- ✅ Deployed and live on the internet

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Web framework |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| cors | Cross-origin resource sharing |
| dotenv | Environment variable management |

### Frontend
| Technology | Purpose |
|---|---|
| HTML | Page structure |
| CSS | Styling and layout |
| JavaScript | Logic and API calls |
| Fetch API | HTTP requests to backend |
| localStorage | Token storage |

### Deployment
| Service | Purpose |
|---|---|
| Render | Backend hosting |
| Netlify | Frontend hosting |
| MongoDB Atlas | Cloud database |

---

## 📁 Project Structure

```
NoteHive/
├── Backend/
│   ├── controllers/
│   │   ├── authController.js     # Signup and login logic
│   │   └── noteController.js     # CRUD logic for notes
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT token verification
│   ├── models/
│   │   ├── userModel.js          # User schema
│   │   └── noteModel.js          # Note schema
│   ├── routers/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── noteRoutes.js         # Note endpoints
│   ├── .env.example              # Environment variable template
│   ├── main.js                   # Entry point
│   └── package.json
│
└── Frontend/
    ├── index.html                # Login and signup page
    ├── notes.html                # Notes dashboard
    ├── css/
    │   ├── style.css             # Login page styles
    │   └── notes.css             # Notes page styles
    └── js/
        ├── auth.js               # Login and signup logic
        └── notes.js              # Notes CRUD logic
```

---

## ⚙️ Getting Started Locally

### 1. Clone the repository

```bash
git clone your_repo_url
cd NoteHive
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

### 3. Set up environment variables

Create a `.env` file inside the `Backend` folder:

```env
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start the backend server

```bash
node main.js
```

Server runs at `http://localhost:4200`

### 5. Open the frontend

Open `Frontend/index.html` using Live Server in VS Code or run:

```bash
cd ../Frontend
npx serve .
```

Frontend runs at `http://localhost:3000`

---

## 📡 API Reference

### Auth Routes

#### Sign Up
```
POST /auth/signup
```
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

#### Login
```
POST /auth/login
```
```json
{
  "email": "john@example.com",
  "password": "123456"
}
```
Returns a JWT token.

---

### Note Routes

> All note routes are **protected**. Include the token in the Authorization header:
> ```
> Authorization: Bearer your_token_here
> ```

| Method | Endpoint | Description |
|---|---|---|
| GET | /notes | Get all notes |
| GET | /notes/:id | Get note by ID |
| POST | /notes | Create a note |
| PUT | /notes/:id | Update a note |
| DELETE | /notes/:id | Delete a note |

#### Optional query parameters for GET /notes:

| Parameter | Description |
|---|---|
| search | Search notes by name |
| page | Page number |
| limit | Notes per page |
| sort | `asc` or `desc` |

---

## 🔐 How Authentication Works

1. User signs up — password is hashed using **bcrypt** before saving
2. User logs in — bcrypt compares the password against the stored hash
3. On success, a **JWT token** is returned
4. For protected routes, the token is sent in the `Authorization` header
5. **authMiddleware** verifies the token on every protected request
6. If valid, the request proceeds — if not, a `401 Unauthorized` is returned
7. Each note is linked to the logged-in user — users can only see their own notes

---

## 🌐 Deployment

| Layer | Platform | URL |
|---|---|---|
| Frontend | Netlify | [notehive365.netlify.app](https://notehive365.netlify.app) |
| Backend | Render | https://notehive-qi1d.onrender.com |
| Database | MongoDB Atlas | Cloud hosted |

---

## 👨‍💻 Author

Built by **Yasaswini Samala** as a full stack learning project.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
