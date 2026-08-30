# 🤖 Intelligent Email Assistant

> AI-powered email management with Google OAuth 2.0, Gmail API, and Google Gemini

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Frontend: React](https://img.shields.io/badge/Frontend-React-61DAFB)](https://reactjs.org)
[![Backend: Express](https://img.shields.io/badge/Backend-Express-000000)](https://expressjs.com)
[![Database: Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E)](https://supabase.com)
[![AI: Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4)](https://ai.google.dev)

---

## 📋 Problem Statement

Email overload is a massive productivity killer. The average professional receives 120+ emails per day and spends 28% of their workday managing email. Intelligent Email Assistant solves this by:

- **Eliminating reading time** — AI summarizes long emails into 3–5 bullet points instantly
- **Speeding up replies** — Google Gemini generates contextual reply drafts in seconds
- **Auto-organizing** — emails are auto-classified (Work / Personal / Finance / Newsletter)
- **Protecting users** — spam and phishing detection flags suspicious messages
- **Extracting value** — action items and dates are pulled from email bodies automatically

No passwords are ever collected. Authentication is 100% Google OAuth 2.0.

---

## ✨ Features

### Core Features
| Feature | Description |
|---|---|
| 🔐 Google OAuth 2.0 | Secure login — no passwords ever collected |
| 📥 Email Dashboard | Inbox with sender, subject, preview, date, read/unread/starred status |
| 💬 Thread View | Grouped conversation view with all messages |
| 🔍 Email Search | Search by sender, subject, or keyword via Gmail API |
| ⚙️ Email Management | Mark read/unread, star/unstar, archive, delete (trash) |
| ✏️ Compose Email | Full compose modal with To, Subject, Body fields |
| ↩️ Reply to Threads | Reply to existing email threads |
| 🤖 AI Summarization | Summarize long emails into 3–5 bullet points |
| 💡 AI Reply Generation | Generate contextual reply drafts via Google Gemini |
| 🎨 Reply Editing | Review and edit AI drafts before sending |
| 🚪 Logout | Revokes OAuth token and clears session |
| 📊 Activity Log | Logs all user actions in Supabase |

### Bonus Features
| Feature | Description |
|---|---|
| 🎭 Tone Selection | Reply tone: Professional / Friendly / Formal / Concise |
| 🏷️ AI Classification | Auto-tag: Work / Personal / Finance / Newsletter |
| 🚨 Priority Detection | Flag high-priority emails with AI |
| 🛡️ Spam Detection | Warn users about suspicious/phishing emails |
| 🔎 Explain Email | Plain-language breakdown of complex emails |
| ✅ Extract Action Items | Pull to-do items from email body |
| 📅 Extract Dates | Highlight dates and deadlines mentioned in emails |
| 📝 Subject Suggestion | AI suggests subject lines when composing |
| ✍️ Grammar Correction | Improve user-written emails before sending |
| 📋 Email Templates | Save and reuse draft templates in Supabase |
| 📈 Analytics Dashboard | Charts for email volume, reply rate, response time |

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18, Tailwind CSS, React Router v6 |
| State Management | TanStack React Query |
| Charts | Recharts |
| Backend | Node.js 18+, Express.js |
| Authentication | Passport.js, passport-google-oauth20, JWT |
| Database | Supabase (PostgreSQL), @supabase/supabase-js |
| Email API | Gmail API (Google Cloud Console) |
| AI | Google Gemini API (`gemini-2.5-flash`) |
| Security | helmet, express-rate-limit, AES encryption, JWT |
| Validation | express-validator |
| Deployment | Vercel (frontend), Render (backend) |

---

## 📸 Screenshots

| Screen | Description |
|---|---|
| **Login Page** | Google Sign-In button, app branding, feature highlights |
| **Dashboard / Inbox** | Email list with AI classification tags and priority flags |
| **Email Thread View** | Full conversation with action buttons |
| **AI Summary Panel** | Inline bullet-point summary below email body |
| **AI Reply Editor** | Tone selector, editable draft, grammar check |
| **Analytics Dashboard** | Email volume chart, action breakdown, response times |

> _Screenshots will be added after deployment_

---

## 🌐 Live Demo

- **Frontend:** https://your-project.vercel.app _(update after Vercel deploy)_
- **Backend API:** https://your-project.onrender.com _(update after Render deploy)_

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm 9+
- Git
- Google Cloud Console account (free)
- Supabase account (free)
- Anthropic API key

---

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/intelligent-email-assistant.git
cd intelligent-email-assistant
```

---

### 2. Google Cloud Console Setup

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project → name it `intelligent-email-assistant`
3. Enable the **Gmail API**:
   - APIs & Services → Library → Search "Gmail API" → Enable
4. Configure OAuth consent screen:
   - Google Auth Platform → Branding → fill App name and emails
   - Audience → External
   - Data Access → Add these scopes manually:
     ```
     https://www.googleapis.com/auth/gmail.readonly
     https://www.googleapis.com/auth/gmail.send
     https://www.googleapis.com/auth/gmail.modify
     https://www.googleapis.com/auth/userinfo.email
     https://www.googleapis.com/auth/userinfo.profile
     ```
   - Audience → Test users → Add your Gmail address
5. Create OAuth credentials:
   - Clients → Create Client → Web application
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `http://localhost:5000/auth/google/callback`
   - Copy **Client ID** and **Client Secret**

---

### 3. Supabase Setup

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project** → fill in name and password → Create
3. Go to **Settings → API Keys** and copy:
   - **Project URL** → `SUPABASE_URL`
   - **Secret key** (sb_secret_...) → `SUPABASE_SERVICE_KEY`
4. Go to **Settings → Database** → copy the **URI** connection string → `SUPABASE_DB_URL`
5. Go to **SQL Editor** → paste the contents of `backend/src/db/schema.sql` → click **Run**

---

### 4. Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Click **API Keys → Create Key**
3. Copy the full key (starts with `sk-ant-...`)

---

### 5. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `backend/.env` and fill in all values then start:
```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000 [development]
✅ Supabase connected
```

---

### 6. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Open `frontend/.env` and set:
```env
REACT_APP_API_URL=http://localhost:5000
```

Start the frontend:
```bash
npm start
```

Frontend runs at `http://localhost:3000`

---

### 7. Verify Everything Works

- [ ] `http://localhost:3000` loads the Login page
- [ ] Click **Continue with Google** → Google login page opens
- [ ] Login with your Gmail (must be added as test user in Google Cloud Console)
- [ ] Dashboard loads with your inbox emails
- [ ] Open an email → click **Summarize** → AI summary appears
- [ ] Click **Generate Reply** → AI draft appears
- [ ] Edit draft and send

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Port backend runs on (5000) |
| `NODE_ENV` | development or production |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console OAuth credentials |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console OAuth credentials |
| `GOOGLE_CALLBACK_URL` | OAuth redirect URI |
| `SESSION_SECRET` | Any long random string for session signing |
| `ENCRYPTION_KEY` | Exactly 32 characters for AES token encryption |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Supabase service role secret key |
| `SUPABASE_DB_URL` | Supabase PostgreSQL connection URI |
| `ANTHROPIC_API_KEY` | Claude AI API key |
| `FRONTEND_URL` | Frontend URL for CORS |

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Backend API base URL |

> ⚠️ **Never commit `.env` files or actual secret values to GitHub.**

---

## 🚀 Deployment

### Backend → Render

1. Push code to GitHub
2. Go to [render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repository
4. Set **Root Directory** to `backend`
5. Build command: `npm install`
6. Start command: `node src/server.js`
7. Add all environment variables
8. Update for production:
   ```
   GOOGLE_CALLBACK_URL=https://your-backend.onrender.com/auth/google/callback
   FRONTEND_URL=https://your-project.vercel.app
   NODE_ENV=production
   ```
9. Click **Deploy**

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Connect your GitHub repository
3. Set **Root Directory** to `frontend`
4. Build command: `npm run build`
5. Output directory: `build`
6. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com
   ```
7. Click **Deploy**

### Update Google Cloud Console for Production

After deploying add production URLs to OAuth credentials:
- Authorized JavaScript origins: `https://your-project.vercel.app`
- Authorized redirect URIs: `https://your-backend.onrender.com/auth/google/callback`

---

## 🔒 Security

- **No passwords** — Google OAuth 2.0 only
- **Tokens encrypted** — AES-256 encryption before storing in Supabase
- **httpOnly sessions** — session cookies never accessible to JavaScript
- **CORS locked** — only allows requests from `FRONTEND_URL`
- **Rate limiting** — prevents brute force and API abuse
- **Helmet** — security HTTP headers on all responses
- **Input validation** — all routes validated with express-validator
- **No secrets in code** — all credentials in environment variables only

---

## 📁 Project Structure

```
intelligent-email-assistant/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── EmailThreadPage.jsx
│   │   │   ├── SearchPage.jsx
│   │   │   ├── SettingsPage.jsx
│   │   │   └── AnalyticsPage.jsx
│   │   └── services/
│   ├── public/
│   ├── .env.example
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── supabase.js
│   │   │   ├── passport.js
│   │   │   └── encryption.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   │   ├── gmailService.js
│   │   │   └── aiService.js
│   │   ├── db/
│   │   │   └── schema.sql
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── README.md
└── .gitignore
```

---

## 📄 License

MIT © 2026 Intelligent Email Assistant — Built by Chaitra (RGMCET, Kurnool)