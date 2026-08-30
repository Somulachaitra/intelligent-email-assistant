# 🤖 Intelligent Email Assistant

> AI-powered email management with Google OAuth 2.0, Gmail API, and Claude AI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Frontend: React](https://img.shields.io/badge/Frontend-React-61DAFB)](https://reactjs.org)
[![Backend: Express](https://img.shields.io/badge/Backend-Express-000000)](https://expressjs.com)
[![AI: Claude](https://img.shields.io/badge/AI-Claude%20Sonnet-7C3AED)](https://anthropic.com)

---

## 📋 Problem Statement

Email overload is a massive productivity killer. The average professional receives 120+ emails per day and spends 28% of their workday managing email. Intelligent Email Assistant solves this by:

- **Eliminating reading time** — AI summarizes long emails into 3–5 bullet points instantly
- **Speeding up replies** — Claude generates contextual reply drafts in seconds
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
| 💡 AI Reply Generation | Generate contextual reply drafts via Claude |
| 🎨 Reply Editing | Review and edit AI drafts before sending |
| 🚪 Logout | Revokes OAuth token and clears session |
| 📊 Activity Log | Logs all user actions in MongoDB |

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
| 📋 Email Templates | Save and reuse draft templates in MongoDB |
| 📈 Analytics Dashboard | Charts for email volume, reply rate, response time |

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18, Tailwind CSS, React Router v6 |
| State Management | TanStack React Query |
| Charts | Recharts |
| Backend | Node.js 18+, Express.js |
| Authentication | Passport.js, passport-google-oauth20 |
| Session | express-session, connect-mongo |
| Database | MongoDB Atlas, Mongoose |
| Email API | Gmail API (Google Cloud Console) |
| AI | Anthropic Claude API (`claude-sonnet-4-6`) |
| Security | helmet, express-rate-limit, crypto-js (AES encryption) |
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

> _Screenshots will be added after first deployment_

---

## 🌐 Live Demo

- **Frontend:** https://your-project.vercel.app _(placeholder — update after Vercel deploy)_
- **Backend API:** https://your-project.onrender.com _(placeholder — update after Render deploy)_

---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm 9+
- MongoDB Atlas account (free tier works)
- Google Cloud Console project
- Anthropic API key

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/intelligent-email-assistant.git
cd intelligent-email-assistant
```

### 2. Google Cloud Console Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the **Gmail API**:
   - APIs & Services → Library → Search "Gmail API" → Enable
4. Create OAuth 2.0 credentials:
   - APIs & Services → Credentials → Create Credentials → OAuth client ID
   - Application type: **Web application**
   - Authorized redirect URIs: `http://localhost:5000/auth/google/callback`
5. Note your **Client ID** and **Client Secret**
6. Configure the OAuth consent screen with required Gmail scopes:
   - `https://www.googleapis.com/auth/gmail.readonly`
   - `https://www.googleapis.com/auth/gmail.send`
   - `https://www.googleapis.com/auth/gmail.modify`
   - `https://www.googleapis.com/auth/userinfo.email`
   - `https://www.googleapis.com/auth/userinfo.profile`

### 3. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster (M0 Sandbox)
3. Create a database user with read/write access
4. Add `0.0.0.0/0` to Network Access (for Render deployment)
5. Get your connection string: `mongodb+srv://USER:PASS@cluster.mongodb.net/email-assistant`

### 4. Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an API key
3. Copy it for the backend `.env`

### 5. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Fill in all values in .env
npm run dev
```
Backend runs at `http://localhost:5000`

### 6. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
# Set REACT_APP_API_URL=http://localhost:5000
npm start
```
Frontend runs at `http://localhost:3000`

---

## 🔧 Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
SESSION_SECRET=
ENCRYPTION_KEY=
MONGODB_URI=
ANTHROPIC_API_KEY=
FRONTEND_URL=http://localhost:3000
```

### Frontend (`frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:5000
```

> ⚠️ **Never commit `.env` files or actual secrets to GitHub.**

---

## 🚀 Deployment

### Backend → Render
1. Push to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your GitHub repository, select `backend/` as root directory
4. Build command: `npm install`
5. Start command: `node src/server.js`
6. Add all environment variables from `backend/.env.example`
7. Update `GOOGLE_CALLBACK_URL` to `https://your-backend.onrender.com/auth/google/callback`
8. Update `FRONTEND_URL` to `https://your-project.vercel.app`

### Frontend → Vercel
1. Create a new project on [Vercel](https://vercel.com)
2. Connect your GitHub repository, set root directory to `frontend/`
3. Build command: `npm run build`
4. Output directory: `build`
5. Add environment variable: `REACT_APP_API_URL=https://your-backend.onrender.com`

### Update Google Cloud Console
- Add production callback URL to Authorized redirect URIs:
  `https://your-backend.onrender.com/auth/google/callback`
- Add production frontend to Authorized JavaScript origins:
  `https://your-project.vercel.app`

---

## 🔒 Security

- **No passwords** — Google OAuth 2.0 only
- **Tokens encrypted** — AES encryption before storing in MongoDB
- **httpOnly cookies** — sessions never accessible to JavaScript
- **CORS locked** — only allows `FRONTEND_URL` origin
- **Rate limiting** — prevents API abuse
- **Helmet** — security HTTP headers on all responses
- **Input validation** — all routes validated with express-validator

---

## 📄 License

MIT © 2024 Intelligent Email Assistant
