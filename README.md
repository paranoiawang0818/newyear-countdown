# 🎆 New Year Countdown Website 2026

A beautifully crafted New Year countdown website featuring a wishing wall and a fully integrated user management system for Chinese Newyear in 2026.

## ✨ Features

- ⏰ **Real-time Countdown**: Precision countdown timer accurate to the second.
- 🎉 **New Year Greetings**: Stunning greeting animations triggered upon countdown completion.
- 👤 **User System**: Full authentication flow including registration, login, and JWT-based authorization.
- 💭 **Wishing Wall**: Users can submit wishes, which are published publicly after administrator approval.
- 🔐 **Role-Based Access Control (RBAC)**: Distinct permission levels for regular users and administrators.
- 📱 **Responsive Design**: Flawless experience across both mobile and desktop devices.
- 🎨 **Modern UI**: Styled with Tailwind CSS, featuring gradient backgrounds and fluid animations.

## 🛠 Tech Stack

### Backend
- Node.js + Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcryptjs (Password Hashing)

### Frontend
- React 18
- Vite
- React Router 6
- Axios
- Tailwind CSS

## 📁 Project Structure

`├── backend/                  # Backend Service
│   ├── src/
│   │   ├── config/           # Configuration files
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Custom middleware
│   │   ├── routes/           # API routes
│   │   └── server.js         # Entry point
│   ├── prisma/
│   │   └── schema.prisma     # Database schema
│   └── package.json
│
└── frontend/                 # Frontend Application
    ├── src/
    │   ├── components/       # Reusable React components
    │   ├── pages/            # Page components
    │   ├── services/         # API integration services
    │   ├── contexts/         # Context API for state management
    │   └── App.jsx
    └── package.json`

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18
- PostgreSQL Database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
cd backend

2. Install dependencies:
npm install

3. Configure environment variables:
Create a `.env` file in the root of the `backend` directory:
DATABASE_URL="postgresql://user:password@localhost:5432/newyear_countdown?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"
PORT=5000
FRONTEND_URL="http://localhost:5173"

4. Initialize the database:
npx prisma generate
npx prisma migrate dev --name init

5. Start the development server:
npm run dev

### Frontend Setup

1. Navigate to the frontend directory:
cd frontend

2. Install dependencies:
npm install

3. Configure environment variables:
Create a `.env` file in the root of the `frontend` directory:
VITE_API_URL=http://localhost:5000/api

4. Start the development server:
npm run dev

5. Open your browser and visit `http://localhost:5173`

## 🔌 API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Fetch current user profile

### Wishes

- `POST /api/wishes` - Create a new wish (Requires Authentication)
- `GET /api/wishes/public` - Fetch public wishes
- `GET /api/wishes/mine` - Fetch current user's wishes (Requires Authentication)
- `GET /api/wishes/all` - Fetch all wishes (Admin only)
- `PATCH /api/wishes/:id/visibility` - Update wish visibility (Admin only)
- `DELETE /api/wishes/:id` - Delete a wish (Requires Authentication)

## 🗄 Database Schema

### User Model
- `id`: Primary Key
- `username`: Unique username
- `password`: Hashed password
- `isAdmin`: Boolean flag for administrator privileges
- `createdAt`: Creation timestamp

### Wish Model
- `id`: Primary Key
- `content`: Text content of the wish
- `isVisible`: Boolean flag for public visibility
- `userId`: Foreign Key referencing User ID
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp

## 👑 Creating an Admin Account

After registering a standard account, you must manually grant administrator privileges via the database:

UPDATE "User" SET "isAdmin" = true WHERE "username" = 'your_username';

Alternatively, you can use Prisma Studio:
npx prisma studio

## ☁️ Deployment

### Backend Deployment (Railway)

1. Push your repository to GitHub.
2. Create a new project on Railway.
3. Provision a PostgreSQL database plugin.
4. Configure all required environment variables.
5. Execute `npx prisma migrate deploy` in your deployment command.
6. Deploy.

### Frontend Deployment (Vercel)

1. Push your repository to GitHub.
2. Import the project into Vercel.
3. Set the `VITE_API_URL` environment variable.
4. Deploy.

## 🛡 Security Features

- Passwords hashed using `bcrypt` (Salt rounds: 10).
- Secure API endpoints using JSON Web Tokens (JWT).
- Built-in SQL Injection prevention via Prisma ORM.
- Cross-Site Scripting (XSS) protection (handled natively by React).
- CORS configuration to restrict unauthorized origins.
- Strict password strength and wish content length validation.

## 📝 Development Notes

- The target countdown date can be modified within `CountdownTimer.jsx`.
- Any modifications to the database models require running `npx prisma migrate dev` to sync the schema.
- Initial admin privileges must be granted manually at the database level.

## 📄 License

MIT
