# Week 2 - Backend Development

This repository contains the Week 2 backend assignments built with Node.js, Express, MongoDB, Mongoose, bcrypt and JWT.

## Projects

- `01-todo-rest-api` - CRUD API for tasks
- `02-user-auth-api` - registration, login and JWT authentication
- `03-notes-app-backend` - JWT-protected notes CRUD API

## Run

Open a terminal inside any project folder:

```bash
npm install
```

Copy `.env.example` to `.env` and add your MongoDB connection string. For the authentication projects, also set a JWT secret. Then run:

```bash
npm run dev
```

The Postman collection in `postman/week2-backend.postman_collection.json` contains the main API requests.
