# ALLEN 2040 Student OS

A student dashboard built with an existing Next.js frontend and Express backend. The frontend and backend run as separate local processes.

## Project layout

- `student-os-dashboard-design-main/student-os-dashboard-design-main/` — Next.js app (dashboard, learning, quiz, homework, wallet, Green Meter, and login pages).
- `allen2040-backend-1/backend/` — Express API and local app data storage.
- `allen2040-backend-1/docs/api-contract.md` — backend API contract.
- `files (1)/` — supplied reference files; these are not the active frontend or backend entry points.

## Requirements

- Node.js and npm
- `npx` access to download the frontend's pinned pnpm version on first install
- A Gemini API key for AI question generation

## Configure the backend

In PowerShell:

```powershell
cd "allen2040-backend-1/backend"
Copy-Item .env.example .env
```

Edit `backend/.env` and set:

- `SESSION_SECRET` to a long random value. You can generate one with `node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"`.
- `AI_API_KEY` to your Gemini API key. Keep it only in `.env`; do not put it in frontend code or commit it.
- `AI_MODEL` and `AI_BASE_URL` are prefilled with the configured Gemini-compatible defaults.
- `PORT` defaults to `5000`; `FRONTEND_ORIGIN` defaults to `http://localhost:3000`.

The `.env` file is ignored by Git. Do not share or commit it. The backend writes local homework files and app state under the ignored `.local-data/` folder.

## Install and run

Open two terminals from the project root.

Backend:

```powershell
cd "allen2040-backend-1/backend"
npm install
npm run dev
```

Frontend:

```powershell
cd "student-os-dashboard-design-main/student-os-dashboard-design-main"
npx pnpm@12.3.4 install
npx pnpm@12.3.4 dev
```

Open [http://localhost:3000](http://localhost:3000). The backend health check is [http://localhost:5000/api/health](http://localhost:5000/api/health).

## Demo login

The current login is a local demo gate, not Supabase Auth. It accepts any non-empty username/email and password. Anyone who can reach the local app can enter, and every signed-in demo user receives administrator access. The backend issues an HttpOnly session cookie signed with `SESSION_SECRET`, which expires after eight hours. Do not deploy this demo login for public or production use.

## Pages

- `/login` — demo sign-in
- `/` — student dashboard
- `/learn` — learning library
- `/quiz` — generate and answer practice questions
- `/homework` — upload and download homework submissions
- `/wallet` — wallet balance, reward redemption, and transaction history
- `/green` — green activity and leaderboard view

## API endpoints

All API paths are prefixed with `/api`.

- `GET /health` — backend health check
- `POST /auth/login`, `GET /auth/me`, `POST /auth/logout` — local demo sessions
- `GET /student`, `GET /student/transactions`, `GET /student/activities` — student and activity data
- `POST /student/redeem`, `POST /student/carbon-action` — wallet and green actions
- `POST /lesson/quiz` — Gemini-backed multiple-choice question generation
- `GET /homework`, `POST /homework`, `GET /homework/:id/download` — homework submissions

## Notes

- The backend entry point is `allen2040-backend-1/backend/server.js`.
- The frontend uses the existing Next.js App Router in `student-os-dashboard-design-main/student-os-dashboard-design-main/app/`.
- Leaderboard entries are sample data; student, wallet, green activity, quiz, and homework features use the local backend.
- Use the `.env.example` files as templates only. Real API keys, session secrets, and local uploads are intentionally excluded from source archives.
