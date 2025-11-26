# Frontend (BuyChecker)

This is a Vite + Vue app. Build output goes to `dist` by default.

Quick deploy steps (one-time setup):

1. Install dependencies:

   npm install

2. Build locally (optional):

   npm run build

3. Deploy to Vercel as a separate project (inside this folder):

   npx vercel login
   cd frontend
   npx vercel --prod

Notes:

- Vercel will run the `build` script (Vite) and serve the `dist` directory as static files.
- If you want to preview before production, run `npx vercel` without `--prod`.
