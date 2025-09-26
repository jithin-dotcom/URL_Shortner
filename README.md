

URL_SHORTER 

A full-stack authentication system built with Express.js and React (Vite) using a Repository Architecture, designed for secure login & signup.

🚀 Overview

This system enables users to:

🔑 Register & log in securely

🌐 Authenticate JWT

🔒 Access protected routes after authentication

🖥️ Enjoy a seamless frontend & backend integration with modern deployment (Vercel + Render)

🛠️ Tech Stack
Layer	Technology
🔧 Frontend	React.js (Vite) + TypeScript + Tailwind
🔧 Backend	Node.js + Express.js + TypeScript
☁️ DB	MongoDB (Mongoose)
🔐  JWT
🏗️ Arch	Repository + Service + Controller
⚡ Tools	Axios, Socket.io (future real-time), Render + Vercel
📸 Features

👤 User Authentication – Registration, login, logout


🔒 JWT-based session handling – Ensures authenticated routes

🗄️ Repository Pattern – Clean separation of DB, service & controller

🎨 Responsive UI – Built with Tailwind + Vite for performance

🚀 Deployed on Cloud – Backend on Render, frontend on Vercel

🌐 Live Demo

🔗 Vercel → https://url-shortner-green-two.vercel.app


⚙️ Getting Started
🔽 Clone the Repo
git clone https://github.com/jithin-dotcom/URL_Shortner.git

🧪 Prerequisites

Node.js ≥ v18

MongoDB (local or Atlas)

📦 Backend Setup
cd server
npm install

🛠️ Environment Variables

Create a .env file in /server:

PORT=5500
MONGO_URI= "your mongoDB URI"
JWT_ACCESS_SECRET= "access token secret"
JWT_REFRESH_SECRET= "refresh token secret"
REDIS_URL= "your redis URI"
FRONTEND_URL= "your frontend uri"
BASE_URL= "your base uri"

Run the backend:

npm run dev

🎨 Frontend Setup
cd client
npm install
npm run dev

🔑 Authentication Flow

User clicks Google Login on frontend.

Backend issues a JWT and sends it to the frontend.

Frontend stores JWT (httpOnly cookie or local storage) for session.

User now has access to protected routes.

         
🌟 Support This Project

If you found this project useful, please give it a ⭐ on GitHub 😊