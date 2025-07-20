Step 1: Set Up PostgreSQL Database
# Start PostgreSQL service
brew services start postgresql

# Access PostgreSQL CLI
psql postgres

# Inside psql shell, run:
CREATE USER myuser WITH PASSWORD 'mypassword';
CREATE DATABASE mydb OWNER myuser;
\q

Step 2: Set Up Express.js Backend
# Navigate to backend directory
cd backend

# Initialize Node project
npm init -y

# Install dependencies
npm install express sequelize pg pg-hstore jsonwebtoken bcryptjs dotenv body-parser

# Install development dependencies
npm install --save-dev nodemon

# Run Sequelize migrations (make sure you’ve configured sequelize properly)
npx sequelize-cli db:migrate

# Start the backend server using nodemon
npx nodemon server.js

Step 3: Set Up Angular Frontend
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the Angular development server
ng serve

The working folders are in frontend are:
AngularTest/frontend/src/app/pages/blog
AngularTest/frontend/src/app/pages/auth
src/app/pages/service/auth.service.ts
src/app/pages/service/blog.service.ts
src/app/layout/component/top-bar


# Authentication :

The application uses JWT (JSON Web Token) for authentication between the Angular frontend and the Express backend. When a user registers via the POST /auth/register endpoint, their details including a hashed password are stored in the PostgreSQL database. After registration, the user can log in using the POST /auth/login endpoint. On successful login, the backend verifies the user credentials, signs a JWT token containing the user's ID and email, and returns it to the client.

The Angular frontend stores the JWT token in localStorage using `localStorage.setItem('token', token)`. For all subsequent protected API calls like GET /posts or POST /posts, the Angular app includes the token in the Authorization header using the format `Authorization: Bearer <token>`. On the backend, a middleware function extracts and verifies the token using the JWT secret. If the token is valid and not expired, the user is authenticated and the request continues. If the token is missing, invalid, or expired, the backend responds with 401 Unauthorized.

To handle token expiration gracefully on the frontend, an Angular HTTP Interceptor checks all HTTP responses for 401 status codes. If a 401 is detected, it clears the token from localStorage, shows an alert saying "Session expired. Please log in again," and redirects the user to the login page using Angular Router.

The JWT token contains a payload with the user ID, email, and expiration timestamp. A typical token payload looks like: `{ "userId": 1, "name": "jhon", "iat": 1721400000, "exp": 1721403600 }`. Tokens are signed using a secret key and expire in one hour (configurable). Tokens are stored only in localStorage to prevent XSS and CSRF risks.

The protected API routes include GET /posts, GET /posts/:id, and POST /posts. These routes require a valid JWT token. The /auth/register and /auth/login routes are public and do not require authentication.

# Bonus Points:
- Optimistic UI updates on post creation
- Route Guards
- Form validation using Zod or Angular Validators
- You're encouraged to use AI tools like Cursor, Claude, or ChatGPT during development.
