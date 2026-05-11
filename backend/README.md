# Orange Backend (MERN)

Production-ready Express + MongoDB + JWT backend for the Orange frontend.

## Stack

- **Node.js + Express 4**
- **MongoDB + Mongoose 8**
- **JWT** (`jsonwebtoken`) + **bcryptjs** for auth
- `dotenv`, `cors`, `morgan`
- `nodemon` for dev

## Folder structure

```
backend/
├── config/             # DB connection
│   └── db.js
├── controllers/        # Route handlers (business logic)
│   ├── authController.js
│   └── userController.js
├── middleware/         # Express middleware
│   ├── authMiddleware.js
│   └── errorMiddleware.js
├── models/             # Mongoose schemas
│   └── User.js
├── routes/             # Express routers
│   ├── authRoutes.js
│   └── userRoutes.js
├── utils/              # Helpers
│   ├── ApiError.js
│   ├── asyncHandler.js
│   └── generateToken.js
├── .env                # Local env (never commit)
├── .env.example
├── .gitignore
├── package.json
└── server.js           # App entrypoint
```

## Setup

```bash
cd backend
npm install
npm run dev        # nodemon
# or
npm start          # node
```

Server runs on `http://localhost:5000` by default.

## Environment variables

Copy `.env.example` to `.env` and fill in:

| Var             | Example                                            |
| --------------- | -------------------------------------------------- |
| `NODE_ENV`      | `development`                                      |
| `PORT`          | `5000`                                             |
| `MONGO_URI`     | MongoDB Atlas / local connection string            |
| `JWT_SECRET`    | long random string                                 |
| `JWT_EXPIRES_IN`| `7d`                                               |
| `CORS_ORIGIN`   | `http://localhost:5173` (Vite dev) — comma-separated for multiple |

## API

Base URL: `/api`

### Health

- `GET /api/health` — liveness probe

### Users

- `GET    /api/users` — list (supports `?page=1&limit=20`)
- `POST   /api/users` — create
- `GET    /api/users/:id` — get one
- `PUT    /api/users/:id` — update *(protected)*
- `DELETE /api/users/:id` — delete *(admin only)*

### Auth

- `POST /api/auth/register` — `{ name, email, password }` → `{ data, token }`
- `POST /api/auth/login` — `{ email, password }` → `{ data, token }`
- `GET  /api/auth/me` — current user *(Bearer token)*

### Response shape

```json
// success
{ "success": true, "data": { ... } }

// error
{ "success": false, "message": "...", "details": [ ... ] }
```

## Frontend (Vite / React) integration

In `frontend/.env`:

```
VITE_API_URL=http://localhost:5000/api
```

In React:

```js
const res = await fetch(`${import.meta.env.VITE_API_URL}/users`);
const json = await res.json();
```

Send the JWT on protected calls:

```js
fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
  headers: { Authorization: `Bearer ${token}` },
});
```

## Conventions

- Controllers stay thin; wrap async handlers with `asyncHandler`.
- Throw `new ApiError(status, message)` for expected failures.
- Never `res.send` raw errors — always go through `errorHandler`.
- Don't put secrets in code. Always use `process.env`.
