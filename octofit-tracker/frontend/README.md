# OctoFit Tracker Frontend

React 19 + Vite presentation tier for the OctoFit multi-tier app.

## Environment variables

Define `VITE_CODESPACE_NAME` so the frontend calls the Codespaces backend URL:

```bash
VITE_CODESPACE_NAME=<your-codespace-name>
```

You can put this in `octofit-tracker/frontend/.env.local`.

When it is set, component requests use:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is not set, the app safely falls back to:

```text
http://localhost:8000/api/[component]/
```

This avoids invalid URLs such as `https://undefined-8000.app.github.dev/...`.

## Run the frontend

```bash
npm install --prefix octofit-tracker/frontend
npm run dev --prefix octofit-tracker/frontend
```
