import fs from "fs";
import path from "path";

// === Config ===
const projectName = "SyncPad Backend";
const description =
  "The backend API for SyncPad — a realtime collaborative learning space. Built with Express, TypeScript, Prisma, and PostgreSQL, and powered by Docker.";
const rootDir = path.join(process.cwd()); // points to /server

// === Ignore these folders from the tree ===
const IGNORE_DIRS = ["node_modules", ".git", "dist", ".next", "generated"];

// === Generate folder tree (excluding generated/prisma) ===
function getDirectoryTree(dir: string, prefix = "", depth = 0): string {
  if (depth > 6) return "";

  const entries = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter(
      (entry: fs.Dirent) =>
        !IGNORE_DIRS.includes(entry.name) &&
        !entry.name.startsWith(".") &&
        entry.name !== "README.md"
    )
    .sort(
      (a: fs.Dirent, b: fs.Dirent) =>
        Number(b.isDirectory()) - Number(a.isDirectory())
    );

  return entries
    .map((entry: fs.Dirent, index: number) => {
      const isLast = index === entries.length - 1;
      const pointer = isLast ? "└── " : "├── ";
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        if (entry.name === "generated") return "";
        return (
          `${prefix}${pointer}${entry.name}/\n` +
          getDirectoryTree(fullPath, newPrefix, depth + 1)
        );
      } else {
        return `${prefix}${pointer}${entry.name}`;
      }
    })
    .join("\n");
}

// === Get scripts from package.json ===
function getScripts(): string {
  const pkgPath = path.join(rootDir, "package.json");
  if (!fs.existsSync(pkgPath)) return "";

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const scripts = pkg.scripts || {};

  return (
    "| Script | Description |\n" +
    "|--------|-------------|\n" +
    Object.entries(scripts)
      .map(([key]) => `| \`${key}\` | — |`)
      .join("\n")
  );
}

// === Generate README ===
const generateReadme = () => {
  const tree = getDirectoryTree(rootDir);
  const scriptsTable = getScripts();

  const content = `# ${projectName}

${description}

## 🛠 Tech Stack

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker

## 🧪 Running Locally

### 1. Clone the repo

\`\`\`bash
git clone https://github.com/your-username/syncpad.git
cd syncpad/server
\`\`\`

### 2. Install dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Set up environment variables

Create a \`.env\` file based on \`.env.example\`:

\`\`\`env
DATABASE_URL=postgresql://postgres:postgres@db:5432/syncpad
PORT=3030
JWT_SECRET=your_secret_key
\`\`\`

### 4. Run with Docker (from root of repo)

\`\`\`bash
docker compose up --build
\`\`\`

### 5. Run locally with Postgres installed

\`\`\`bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev
\`\`\`

## 📁 Project Structure

\`\`\`
${tree}
\`\`\`

## 📦 Scripts

${scriptsTable}

`;

  fs.writeFileSync(path.join(rootDir, "README.md"), content);
  console.log("✅ SyncPad backend README.md generated!");
};

generateReadme();
