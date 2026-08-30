# 🤖 Intelligent Email Assistant

> AI-powered email management with Google OAuth 2.0, Gmail API, Google Gemini, and Supabase.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Frontend: React](https://img.shields.io/badge/Frontend-React-61DAFB)](https://react.dev/)
[![Backend: Express](https://img.shields.io/badge/Backend-Express-000000)](https://expressjs.com/)
[![Database: Supabase](https://img.shields.io/badge/Database-Supabase-3ECF8E)](https://supabase.com/)
[![AI: Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4)](https://ai.google.dev/)

---

## 📋 Problem Statement

Email overload is a major productivity problem. Intelligent Email Assistant helps users manage their inbox faster by combining Gmail integration with AI-powered email analysis and assistance.

The application helps users:

- **Reduce reading time** — summarize long emails into concise points.
- **Speed up replies** — generate contextual reply drafts with Google Gemini.
- **Organize emails** — classify emails into categories such as Work, Personal, Finance, and Newsletter.
- **Identify suspicious emails** — detect spam and possible phishing messages.
- **Extract useful information** — identify action items and important dates from email content.

No application passwords are collected. Authentication is handled through **Google OAuth 2.0**.

---

## ✨ Features

### Core Features

| Feature | Description |
|---|---|
| 🔐 Google OAuth 2.0 | Secure Google authentication without collecting passwords |
| 📥 Email Dashboard | View inbox emails with sender, subject, preview, date, read/unread, and starred status |
| 💬 Thread View | View grouped conversations and email threads |
| 🔍 Email Search | Search emails by sender, subject, or keyword |
| ⚙️ Email Management | Mark as read/unread, star/unstar, archive, and move emails to trash |
| ✏️ Compose Email | Compose and send new emails |
| ↩️ Reply to Threads | Reply directly to existing email threads |
| 🤖 AI Summarization | Summarize emails into concise bullet points |
| 💡 AI Reply Generation | Generate contextual reply drafts using Google Gemini |
| 🎨 Reply Editing | Review and edit AI-generated drafts before sending |
| 🚪 Logout | Sign out and clear the authenticated session |
| 📊 Activity Log | Store and track user activity in Supabase |

### Bonus Features

| Feature | Description |
|---|---|
| 🎭 Tone Selection | Professional, Friendly, Formal, or Concise reply styles |
| 🏷️ AI Classification | Categorize emails as Work, Personal, Finance, or Newsletter |
| 🚨 Priority Detection | Identify potentially high-priority emails |
| 🛡️ Spam Detection | Warn users about suspicious or phishing emails |
| 🔎 Explain Email | Explain complicated email content in simple language |
| ✅ Extract Action Items | Identify tasks and to-do items from emails |
| 📅 Extract Dates | Identify dates and deadlines mentioned in emails |
| 📝 Subject Suggestion | Suggest subject lines while composing |
| ✍️ Grammar Correction | Improve grammar and clarity in email drafts |
| 📋 Email Templates | Save and reuse email templates |
| 📈 Analytics Dashboard | Display email activity and response analytics |

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 18 |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| State Management | TanStack React Query |
| Charts | Recharts |
| Backend | Node.js 18+ |
| API Framework | Express.js |
| Authentication | Passport.js + Google OAuth 2.0 |
| Database | Supabase PostgreSQL |
| Email API | Gmail API |
| AI | Google Gemini |
| Security | Helmet, Express Rate Limit, AES Encryption, JWT |
| Validation | express-validator |
| Frontend Deployment | Vercel |
| Backend Deployment | Render |

---

## 🌐 Live Demo

### Frontend

**Live Application:**

https://intelligent-email-assistant-eta.vercel.app

### Backend

**Backend API:**

https://intelligent-email-assistant-kqhc.onrender.com

### Source Code

**GitHub Repository:**

https://github.com/Somulachaitra/intelligent-email-assistant

---

## 📸 Application Screens

The application includes:

- Login Page with Google Sign-In
- Email Dashboard / Inbox
- Email Thread View
- AI Summary Panel
- AI Reply Editor
- Compose Email
- Search
- Starred Emails
- Sent Emails
- Analytics Dashboard

---

## ⚙️ Local Setup

### Prerequisites

Make sure you have:

- Node.js 18+
- npm 9+
- Git
- Google Cloud Console account
- Supabase account
- Google Gemini API key

---

## 1. Clone the Repository

```bash
git clone https://github.com/Somulachaitra/intelligent-email-assistant.git
cd intelligent-email-assistant
