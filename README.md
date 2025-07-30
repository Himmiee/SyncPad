# SyncPad

A realtime collaborative learning platform built with a Vue frontend and Node.js backend (Express, TypeScript, Prisma, PostgreSQL), containerized with Docker.

## Monorepo Structure

```
├── client/
└── server/
```

- `client/`: Vue.js frontend app
- `server/`: Express.js backend with Prisma and PostgreSQL
- `docker-compose.yml`: Manages both frontend & backend services using Docker

## Features (So Far)

- User authentication
- JWT token-based access
- PostgreSQL database via Prisma ORM
- Dockerized backend and database setup

## Tech Stack

- Vue.js
- Node.js (Express + TypeScript)
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose

## Running the App Locally

### 1. Clone the repository

```bash
git clone https://github.com/your-username/syncpad.git
cd syncpad
```

### 2. Set up environment variables

Place your backend env inside:

```
server/.env
```

Example contents:
```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/syncpad
PORT=3030
JWT_SECRET=your-secret-key
```

### 3. Run both frontend and backend via Docker Compose

From the root of the project:

```bash
docker compose up --build
```

### 4. Access the services

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3030](http://localhost:3030)

---

This is an early version of SyncPad — additional features and improvements are in development.
# Syncpad
