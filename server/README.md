# SyncPad Backend

The backend API for SyncPad — a realtime collaborative learning space. Built with Express, TypeScript, Prisma, and PostgreSQL, and powered by Docker.

## 🛠 Tech Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker

## 🧪 Running Locally

### 1. Clone the repo

```bash
git clone https://github.com/your-username/syncpad.git
cd syncpad/server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL=postgresql://postgres:postgres@db:5432/syncpad
PORT=3030
JWT_SECRET=your_secret_key
```

### 4. Run with Docker

```bash
docker compose up --build
```

### 5. Run with local Postgres

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## 📁 Project Structure

```
├── prisma/
│   ├── migrations/
│   │   ├── 20250729234604_init/
│   │   │   └── migration.sql
│   │   └── migration_lock.toml
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── db.ts
│   ├── middleware/
│   │   ├── authMiddleware.ts
│   │   └── errorHandler.ts
│   ├── modules/
│   │   ├── _/

│   │   └── user/
│   │       ├── user.controller.ts
│   │       ├── user.route.ts
│   │       ├── user.service.ts
│   │       └── user.validator.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   └── regex.ts
│   ├── app.ts
│   └── server.ts
├── types/
│   └── express.d.ts
├── Dockerfile
├── docker-compose.yaml
├── generate-readme.ts
├── package-lock.json
├── package.json
└── tsconfig.json
```

## 📦 Scripts

| Script | Description |
|--------|-------------|
| `generate:readme` | — |
| `dev` | — |
| `build` | — |
| `start` | — |

