# Todo List FE

Simple React + Vite todo list. Features:
- Add, edit, delete, complete tasks
- Filter by all/active/completed, search, clear completed
- LocalStorage persistence

## Scripts
- `npm install` – install dependencies
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview built app
- `npm run lint` – run eslint

## Structure
- `src/App.jsx` – main app logic and state
- `src/components/` – UI components (form, list, filters)
- `src/App.css` – basic styling
- `vite.config.js` – Vite + React config

## Backend host (env)
- Set `VITE_BE_HOST` (see `.env.example`) to point the frontend at your API host at build time.

## Docker
- Build: `make build` (uses `BE_HOST` to forward into `VITE_BE_HOST`, default `http://localhost:3000`)
- Run: `docker run -p 8080:80 todo-list-fe:0.1.0` then visit `http://localhost:8080` (served via `serve`, no nginx included)

## Deploy (Helm)
- Helm chart lives in `deploy/todo-list-fe`.
- Jenkins pipeline builds/pushes the image, then deploys with `helm upgrade --install todo-list-fe deploy/todo-list-fe --set image.repository=<user>/todo-list-fe --set image.tag=<build-number>`.
