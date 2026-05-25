# NoteHive

A full stack Notes App built with Node.js, Express, MongoDB, and vanilla JavaScript — featuring JWT auth, full CRUD, and a clean responsive UI.

🌐 **Live Demo** → [notehive365.netlify.app](https://notehive365.netlify.app)

## Features
- User signup/login with encrypted passwords and JWT authentication
- Full CRUD on notes, privately linked to each user
- Search, pagination, and sorting support

## Tech Stack
**Backend:** Node.js, Express, MongoDB, Mongoose, bcryptjs, JWT  
**Frontend:** HTML, CSS, Vanilla JS, Fetch API  
**Deployed on:** Render (backend), Netlify (frontend), MongoDB Atlas (database)

## Quick Start
```bash
git clone your_repo_url && cd NoteHive/Backend
npm install
# Add .env with MONGO_URL and JWT_SECRET
node main.js
```

## API
- `POST /auth/signup` and `POST /auth/login`
- `GET | POST | PUT | DELETE /notes` (JWT protected)

## 🔐 How Authentication Works
1. User signs up — password is hashed using **bcrypt** before saving
2. User logs in — bcrypt compares the password against the stored hash
3. On success, a **JWT token** is returned
4. For protected routes, the token is sent in the `Authorization` header
5. **authMiddleware** verifies the token on every protected request
6. If valid, the request proceeds — if not, a `401 Unauthorized` is returned
7. Each note is linked to the logged-in user — users can only see their own notes

---
Built by **Yasaswini Samala** · MIT License
