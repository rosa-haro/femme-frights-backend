
# 🎬 FemmeFrights API - Backend

A RESTful API for **FemmeFrights**, a platform focused on horror films directed by women. Build with Node.js and Express, the API hadles user management, movie data, authentication, and  user-specific features such as favorites and watchlists.

---

## 🚀 Features

- 🔐 **User authentication & JWT tokens**
- 📸 **Profile picture upload and updating** using Multer
- 💌 **Welcome email** on signup (via Nodemailer)
- 🎞️ **Movies CRUD** operations (admin protected)
- ❤️ **Favorites & Watchlist** toggle for users
- 🔎 **Advanced movie sorting & search**
- 🧠 Clean architecture and modular controllers

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (Access & Refresh tokens)
- **Utilities:** Multer, Bcrypt, Nodemailer, dotenv
- **Testing Tools:** Postman or ThunderClient (recommended)

---

## 📁 Folder Structure

```
src/
├── config/             # Database connection
├── controllers/        # Login, Movies, Users
├── middlewares/        # Auth & Multer
├── models/             # Mongoose Schemas
├── routes/             # Routers for login, movies, users
├── services/           # Email service (Nodemailer)
├── utils/              # Token generator
uploads/                # Profile pictures (static)
.env                    # Environment variables
index.js                # Entry point
```



## 🌐 API Endpoints

> ⚠️ **Note**: The refresh-token edpoint is currently available in the API but not yet implemented in the frontend.

### 🔐 Auth (Login / Signup)
| Method | Endpoint         | Description                   |
|--------|------------------|-------------------------------|
| POST   | `/signup`        | Register new user             |
| POST   | `/login`         | Login with credentials        |
| GET    | `/refresh-token` | Get a new access token        |

---

### 🎞️ Movies

> ⚠️ **Note**: Admin-only endpoints (POST, PATCH, DELETE on `/movies`) are available in the API but not yet implemented in the frontend. Admin role management must be handled manually in the database for now.

| Method | Endpoint                         | Auth     | Description                    |
|--------|----------------------------------|----------|--------------------------------|
| GET    | `/movies`                        | Public   | Get all movies                 |
| GET    | `/movies/:idMovie`               | Public   | Get movie by ID                |
| GET    | `/movies/search/title?title=`    | Public   | Search movies by title         |
| GET    | `/movies/sort/alphabetical`      | Public   | Sort movies A-Z                |
| GET    | `/movies/sort/year-asc`          | Public   | Sort movies by year ↑          |
| GET    | `/movies/sort/year-desc`         | Public   | Sort movies by year ↓          |
| POST   | `/movies`                        | Admin    | Add new movie                  |
| PATCH  | `/movies/:idMovie`               | Admin    | Edit movie details             |
| DELETE | `/movies/:idMovie`               | Admin    | Delete movie                   |

---

### 👤 Users
| Method | Endpoint                          | Auth   | Description                      |
|--------|-----------------------------------|--------|----------------------------------|
| GET    | `/users/myprofile`                | User   | Get current user info            |
| PATCH  | `/users/myprofile`                | User   | Edit profile (incl. picture)     |
| DELETE | `/users/myprofile`                | User   | Delete account                   |
| PATCH  | `/users/favorites/:idMovie`       | User   | Toggle favorite movie            |
| PATCH  | `/users/watchlist/:idMovie`       | User   | Toggle movie in watchlist        |

---

## ✅ Setup & Run

### 1. Clone the repo
```bash
git clone https://github.com/rosa-haro/femme-frights-backend.git
cd femme-frights-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file based on the provided `.env.example`:

```bash
PORT=3500
MONGO_URL=mongodb+srv://demo_user:demo_password@femme-frights-cluster.gjljzhu.mongodb.net/femme_frights_demo
SECRET_TOKEN=demotoken1234567890
SECRET_REFRESH_TOKEN=demorefreshtoken0987654321
```

✅ This configuration uses a public demo database prepared for testing.

### 4. Run the server
```bash
npm start
```
> Server will run at: `http://localhost:3500`

---

## 🧪 Demo Accounts

You can use these demo accounts to explore the API:

**Regular User**
```
username: exampleuser
password: 123456789
```

**Admin Account**
```
username: exampleadmin
password: 123456789
```

> ⚠️ Admin-exclusive endpoints are not yet implemented in the frontend.

---

## 🔗 Related Projects

- [Frontend Repository](https://github.com/rosa-haro/femme-frights-frontend.git)

---

## 👩‍💻 Author

**Rosa Haro** – [GitHub Profile](https://github.com/rosa-haro)
