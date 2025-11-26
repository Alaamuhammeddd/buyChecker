# Backend (BuyChecker)

This folder contains a small Express app adapted to run either:

- locally with `node server.js` (starts an HTTP server), or
- as a Vercel Serverless Function via the `api/index.js` wrapper.

Quick deploy steps (one-time setup):

1. Install dependencies:

   npm install

2. Deploy to Vercel as a separate project (inside this folder):

   npx vercel login
   cd backend
   npx vercel --prod

Notes:

- The Express app is exported from `server.js`. Vercel will use the file under `api/index.js` which wraps the app with `serverless-http`.
- No build step is required for this backend; Vercel will install dependencies and run functions automatically.
