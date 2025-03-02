# To-Do App REST API

A REST API for managing a to-do list, built as a learning project to demonstrate skills in Node.js, Express, MongoDB, and JWT authentication.

## Features

- User registration and login with JWT authentication (`POST /api/auth/register`, `POST /api/auth/login`)
- Add a new task (`POST /api/todos`)
- Get all tasks (`GET /api/todos`)
- Delete a task (`DELETE /api/todos/:id`)
- Update a task (`PUT /api/todos/:id`)
- Filter completed tasks (`GET /api/todos/completed`)
- Filter pending tasks (`GET /api/todos/pending`)

## Technologies

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
- **Validation**: validator package for input validation
- **Environment**: dotenv for configuration
- **Development**: nodemon for hot reloading
