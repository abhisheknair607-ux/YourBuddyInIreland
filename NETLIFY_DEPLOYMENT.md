# Netlify Deployment Checklist

This project is prepared for Netlify deployment with Next.js App Router, Auth.js, and docs-first chat.

## 1. Build and runtime

- Build command: `npm run build`
- Publish directory: `.next`
- Node version: `20`
- `knowledge/**` is included in the deployed functions bundle
- `pdf-parse` worker files are explicitly included for PDF parsing in production

The Netlify config lives in [netlify.toml](/c:/Users/itsab/OneDrive/Desktop/Projects/Chatbot%20for%20Students/netlify.toml).

## 2. Required Netlify environment variables

Add these in Netlify:

- `GEMINI_API_KEY`
- `AUTH_SECRET`
- `AUTH_GOOGLE_ID`
- `AUTH_GOOGLE_SECRET`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `CONTACT_EMAIL_TO`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_TLS_REJECT_UNAUTHORIZED`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

Optional:

- `AUTH_URL` set to your deployed site URL, for example `https://guid-on.netlify.app`
- `NEXT_PUBLIC_MENTORSHIP_BOOKING_URL`

Use [`.env.local.example`](/c:/Users/itsab/OneDrive/Desktop/Projects/Chatbot%20for%20Students/.env.local.example) as the reference template.

## 3. Google OAuth settings

In Google Cloud Console, make sure your OAuth client is set for:

- Audience: `External`
- Your login email added as a `Test user` while testing

Authorized redirect URIs should include:

- `http://localhost:3018/api/auth/callback/google`
- `http://127.0.0.1:3018/api/auth/callback/google`
- `https://guid-on.netlify.app/api/auth/callback/google`

If you later add a custom domain, add that callback too.

## 4. Email delivery

Feedback and get-in-touch requests are sent through SMTP to `CONTACT_EMAIL_TO`.

For Gmail SMTP, use a Gmail App Password for `SMTP_PASS`. Use `SMTP_TLS_REJECT_UNAUTHORIZED=true` in Netlify unless your production SMTP path has a certificate issue.

## 5. Knowledge docs on Netlify

The app searches the local `knowledge/` folder first and only then falls back to Gemini web search.

For Netlify:

- keep your PDFs, DOCX, MD, and TXT files inside `knowledge/`
- redeploy after changing knowledge files

## 6. Auth user storage note

Local development stores auth users in `data/auth-users.json`.

On Netlify, the filesystem is not durable between serverless invocations. This project now falls back safely so auth does not crash, but the saved user list is not a production database yet.

For durable production storage later, move user persistence to:

- Postgres / Neon / Supabase
- or another durable hosted database

Chat history uses Firestore when the Firebase service account variables above are configured. In Netlify, paste the private key with newline escapes (`\n`) preserved.

## 7. Deployment skew protection

This project now exposes `NEXT_PUBLIC_DEPLOYMENT_ID` at build time and sends the Netlify deployment header on client API requests. That helps reduce stale-client vs new-function mismatches during rolling deploys.

## 8. Recommended deploy flow

1. Push code to GitHub
2. Import the repo into Netlify
3. Confirm the environment variables
4. Deploy once
5. Test:
   - `/`
   - `/login`
   - Google sign-in
   - `/dashboard`
   - `/api/chat`
   - PDF/doc-based answers from `knowledge/`
