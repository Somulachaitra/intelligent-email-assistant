import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  EyeOff, 
  Server, 
  Trash2, 
  CheckCircle2, 
  ArrowLeft, 
  ExternalLink,
  HelpCircle,
  FileText
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const PrivacyPolicyPage = () => {
  const lastUpdated = "September 5, 2026";

  return (
    <div className="min-h-screen bg-[#F5F0E8] dark:bg-[#0A0A0F] text-[#2C2C2C] dark:text-[#EAEAEA] font-sans transition-colors duration-300">
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-30 bg-[#F5F0E8]/90 dark:bg-[#0A0A0F]/90 backdrop-blur-md border-b border-[#E8E0D0] dark:border-[#222233]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#8B6914] dark:text-[#E6C98F] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Sign In</span>
            </Link>
            <div className="h-4 w-px bg-[#E8E0D0] dark:bg-[#222233]" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#8B6914] flex items-center justify-center text-white shadow-sm">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-sm text-[#2C2C2C] dark:text-white">
                Intelligent Email Assistant
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/terms"
              className="text-xs font-medium text-[#6B6B6B] dark:text-slate-400 hover:text-[#8B6914] dark:hover:text-[#E6C98F] transition-colors"
            >
              Terms of Service
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Title Header */}
        <div className="mb-10 pb-8 border-b border-[#E8E0D0] dark:border-[#222233]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF4E6] dark:bg-[#8B6914]/20 border border-[#E6C98F] dark:border-[#8B6914]/40 text-[#8B6914] dark:text-[#E6C98F] text-xs font-semibold mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Google API Compliance & Privacy Standards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#2C2C2C] dark:text-white tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#6B6B6B] dark:text-slate-400">
            Effective Date: <span className="font-medium text-[#2C2C2C] dark:text-slate-200">{lastUpdated}</span> &bull; Last Revised: <span className="font-medium text-[#2C2C2C] dark:text-slate-200">{lastUpdated}</span>
          </p>
        </div>

        {/* Highlight Alert: Google Limited Use Compliance Notice */}
        <div className="mb-10 p-6 rounded-2xl bg-amber-500/10 border-l-4 border-l-[#8B6914] border-y border-r border-[#E8E0D0] dark:border-[#8B6914]/30">
          <h2 className="text-base font-serif font-bold text-[#8B6914] dark:text-[#E6C98F] flex items-center gap-2 mb-2">
            <ShieldCheck className="w-5 h-5 text-[#8B6914] dark:text-[#E6C98F]" />
            Google API Services User Data Policy & Limited Use Disclosure
          </h2>
          <p className="text-sm text-[#5C4A32] dark:text-slate-300 leading-relaxed">
            Intelligent Email Assistant's use and transfer of information received from Google APIs to any other app will adhere to the{' '}
            <a 
              href="https://developers.google.com/terms/api-services-user-data-policy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-[#8B6914] dark:text-[#E6C98F] underline inline-flex items-center gap-1 hover:opacity-80"
            >
              Google API Services User Data Policy
              <ExternalLink className="w-3.5 h-3.5 inline" />
            </a>
            , including the <strong>Limited Use</strong> requirements.
          </p>
          <div className="mt-3 text-xs text-[#5C4A32] dark:text-slate-400 font-medium">
            &bull; We do not use Google user data to serve ads.<br />
            &bull; We do not transfer Google user data to third parties without your explicit consent.<br />
            &bull; We do not use Google user data / Gmail content to train, retrain, or fine-tune generalized AI or machine learning models.
          </div>
        </div>

        {/* Section 1: Overview */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white">
            1. Introduction
          </h2>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            Welcome to <strong>Intelligent Email Assistant</strong> ("we", "our", or "the Service"). We provide an AI-augmented executive email management application designed to help individuals and teams organize their inbox, summarize lengthy email threads, extract actionable tasks, and draft thoughtful email replies.
          </p>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            We value your trust and are dedicated to treating your communications with the utmost confidentiality, security, and integrity. This Privacy Policy details the exact types of data we access from your Google account, the purposes for which this data is used, how your tokens and information are stored and protected, and your rights to manage or delete your data.
          </p>
        </section>

        {/* Section 2: Gmail Data Accessed & Permissions */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#8B6914] dark:text-[#E6C98F]" />
            2. Google Account Data & Gmail Permissions Accessed
          </h2>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            Our application connects to your Google account strictly through official Google OAuth 2.0 protocols. We only request the minimum permissions (scopes) necessary to provide our core productivity features:
          </p>

          <div className="space-y-4 mt-4">
            {/* Scope 1: Userinfo */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233] shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#FAF7F2] dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] text-[#8B6914] dark:text-[#E6C98F] font-medium">
                    userinfo.email &bull; userinfo.profile
                  </span>
                  <h3 className="text-base font-serif font-bold text-[#2C2C2C] dark:text-white mt-2">
                    Account Identity & Profile Information
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 mt-2 leading-relaxed">
                <strong>Data Accessed:</strong> Your primary Google email address, display name, and avatar image.
              </p>
              <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 mt-1 leading-relaxed">
                <strong>Why It Is Required:</strong> To verify your identity, maintain your authenticated session, prevent unauthorized access, and display your personalized profile in the application header.
              </p>
            </div>

            {/* Scope 2: gmail.readonly */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233] shadow-sm">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#FAF7F2] dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] text-[#8B6914] dark:text-[#E6C98F] font-medium">
                https://www.googleapis.com/auth/gmail.readonly
              </span>
              <h3 className="text-base font-serif font-bold text-[#2C2C2C] dark:text-white mt-2">
                Read Email Messages & Metadata
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 mt-2 leading-relaxed">
                <strong>Data Accessed:</strong> Message headers (sender, recipients, timestamp, subject line), message body content (plain text and HTML), message snippets, message labels, and conversation threads.
              </p>
              <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 mt-1 leading-relaxed">
                <strong>Why It Is Required:</strong> To populate and display your email inbox within the web application, support full-text keyword search, generate executive AI summaries of long email threads, and extract important action items on demand.
              </p>
            </div>

            {/* Scope 3: gmail.modify */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233] shadow-sm">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#FAF7F2] dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] text-[#8B6914] dark:text-[#E6C98F] font-medium">
                https://www.googleapis.com/auth/gmail.modify
              </span>
              <h3 className="text-base font-serif font-bold text-[#2C2C2C] dark:text-white mt-2">
                Manage Email Labels & Message Organization
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 mt-2 leading-relaxed">
                <strong>Data Accessed:</strong> Modifying email labels, thread status, read/unread states, and folder location.
              </p>
              <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 mt-1 leading-relaxed">
                <strong>Why It Is Required:</strong> To enable you to manage your inbox directly from our interface—including marking messages as read or unread, starring key emails, archiving processed threads, and moving unwanted messages to the trash bin at your explicit command.
              </p>
            </div>

            {/* Scope 4: gmail.send */}
            <div className="p-5 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233] shadow-sm">
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-[#FAF7F2] dark:bg-[#1A1A24] border border-[#E8E0D0] dark:border-[#222233] text-[#8B6914] dark:text-[#E6C98F] font-medium">
                https://www.googleapis.com/auth/gmail.send
              </span>
              <h3 className="text-base font-serif font-bold text-[#2C2C2C] dark:text-white mt-2">
                Send Outgoing Emails on Your Behalf
              </h3>
              <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 mt-2 leading-relaxed">
                <strong>Data Accessed:</strong> Outgoing email transmission capability.
              </p>
              <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 mt-1 leading-relaxed">
                <strong>Why It Is Required:</strong> To enable you to send newly composed emails and dispatch AI-generated reply drafts. <strong>No email is ever sent autonomously or without your explicit confirmation and click of the "Send" button.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: How Gmail Data is Used & AI Training Statement */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white flex items-center gap-2">
            <EyeOff className="w-5 h-5 text-[#8B6914] dark:text-[#E6C98F]" />
            3. How Gmail Data is Used & Artificial Intelligence Processing
          </h2>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            Your Gmail data is used strictly to provide user-facing features that you affirmatively initiate within the Intelligent Email Assistant interface.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="p-4 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#8B6914] dark:text-[#E6C98F] mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>On-Demand AI Summaries</span>
              </div>
              <p className="text-xs text-[#5C4A32] dark:text-slate-300 leading-relaxed">
                When you click "Summarize", the text of that thread is sent in a secure, ephemeral session to our AI provider to produce a bulleted overview. The text is not retained after the summary is generated.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233]">
              <div className="flex items-center gap-2 text-sm font-semibold text-[#8B6914] dark:text-[#E6C98F] mb-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Contextual Reply Drafting</span>
              </div>
              <p className="text-xs text-[#5C4A32] dark:text-slate-300 leading-relaxed">
                When you request a reply draft, relevant context is used to generate a suggested response. You maintain complete control to edit, modify, or discard the draft before sending.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#FAF7F2] dark:bg-[#16161F] border border-[#E8E0D0] dark:border-[#222233] mt-4">
            <h3 className="text-sm font-serif font-bold text-[#2C2C2C] dark:text-white mb-2">
              Explicit Declaration on AI/ML Model Training:
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 leading-relaxed">
              <strong>Intelligent Email Assistant does NOT use data obtained through Google Workspace APIs or Gmail APIs to train, retrain, or fine-tune generalized AI and/or ML models.</strong>
            </p>
            <p className="text-xs text-[#6B6B6B] dark:text-slate-400 mt-2 leading-relaxed">
              All interaction with AI inference engines occurs via enterprise endpoints with strict zero-data-retention (ZDR) agreements, ensuring your private communications are never used to train underlying public models.
            </p>
          </div>
        </section>

        {/* Section 4: Data Sharing Policy */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white">
            4. Whether Data is Shared
          </h2>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            We hold a strict policy regarding the transfer of your personal and email data:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#5C4A32] dark:text-slate-300">
            <li><strong>No Data Sales:</strong> We do not sell, rent, monetize, or trade your Google data or personal information to third parties, advertising networks, or data brokers.</li>
            <li><strong>No Advertising:</strong> We never display targeted advertisements based on your email contents or Google account data.</li>
            <li><strong>Infrastructure Sub-processors:</strong> Data is only transmitted to essential infrastructure providers (such as cloud hosting and AI inference endpoints) solely to execute the features you request. All sub-processors are bound by strict contractual data confidentiality requirements.</li>
            <li><strong>Human Access Restrictions:</strong> No human employee or contractor will read your private emails unless: (1) you have given explicit consent for debugging a specific issue, (2) it is necessary for security investigation (such as security threats or abuse), or (3) we are compelled by valid legal process or court order.</li>
          </ul>
        </section>

        {/* Section 5: Token & Data Storage */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#8B6914] dark:text-[#E6C98F]" />
            5. Token and Data Storage
          </h2>
          <div className="space-y-3 text-sm text-[#5C4A32] dark:text-slate-300 leading-relaxed">
            <p>
              We implement industry-standard cryptographic techniques to safeguard your credentials:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233]">
                <h4 className="font-serif font-bold text-sm text-[#2C2C2C] dark:text-white mb-1">AES-256 Encryption at Rest</h4>
                <p className="text-xs text-[#5C4A32] dark:text-slate-300">
                  Google OAuth access tokens and refresh tokens are encrypted using AES-256 encryption with a secure server-side key before being committed to the database.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233]">
                <h4 className="font-serif font-bold text-sm text-[#2C2C2C] dark:text-white mb-1">Server-Side Token Isolation</h4>
                <p className="text-xs text-[#5C4A32] dark:text-slate-300">
                  Google access tokens are never transmitted to or stored within the client browser. Your web session is secured via a short-lived, signed JSON Web Token (JWT).
                </p>
              </div>
            </div>
            <p className="text-xs text-[#6B6B6B] dark:text-slate-400">
              Email messages and attachments are fetched dynamically on demand through the Gmail API and are not permanently cached or stored in secondary storage.
            </p>
          </div>
        </section>

        {/* Section 6: Security Safeguards */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-[#8B6914] dark:text-[#E6C98F]" />
            6. Security Safeguards
          </h2>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            We maintain physical, technical, and administrative protections to safeguard your data:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm text-[#5C4A32] dark:text-slate-300">
            <li><strong>Encryption in Transit:</strong> All communications between your browser, our API servers, and Google APIs use TLS 1.3 / HTTPS encryption.</li>
            <li><strong>Rate Limiting & Abuse Prevention:</strong> Robust API rate limiting to protect against brute-force attacks and denial-of-service attempts.</li>
            <li><strong>Least Privilege Access:</strong> Backend servers operate on minimal system permissions with strict firewall configurations.</li>
          </ul>
        </section>

        {/* Section 7: Data Retention & Deletion */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-[#8B6914] dark:text-[#E6C98F]" />
            7. Data Retention & Deletion
          </h2>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            You retain complete control over your data, account, and permissions at all times:
          </p>
          
          <div className="space-y-3 mt-3">
            <div className="p-4 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233]">
              <h4 className="font-serif font-bold text-sm text-[#2C2C2C] dark:text-white mb-1">Retention Duration</h4>
              <p className="text-xs text-[#5C4A32] dark:text-slate-300 leading-relaxed">
                Your user account profile and encrypted token credentials are retained only as long as you maintain an active account with us. Inactive accounts may be purged periodically.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233]">
              <h4 className="font-serif font-bold text-sm text-[#2C2C2C] dark:text-white mb-1">Requesting Account & Data Deletion</h4>
              <p className="text-xs text-[#5C4A32] dark:text-slate-300 leading-relaxed">
                You can request the immediate and permanent deletion of your account and all associated records (including user profile data, encrypted tokens, and preference logs) by contacting us at{' '}
                <a href="mailto:privacy@intelligentemailassistant.com" className="font-semibold text-[#8B6914] dark:text-[#E6C98F] underline">
                  privacy@intelligentemailassistant.com
                </a>
                . Deletion requests are processed within 30 business days.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233]">
              <h4 className="font-serif font-bold text-sm text-[#2C2C2C] dark:text-white mb-1">Revoking Access via Google Account</h4>
              <p className="text-xs text-[#5C4A32] dark:text-slate-300 leading-relaxed">
                You can immediately revoke Intelligent Email Assistant's access to your Google Account at any time directly through the{' '}
                <a 
                  href="https://myaccount.google.com/permissions" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="font-semibold text-[#8B6914] dark:text-[#E6C98F] underline inline-flex items-center gap-1"
                >
                  Google Third-Party Permissions Page
                  <ExternalLink className="w-3 h-3 inline" />
                </a>
                . Revoking access halts our ability to query the Gmail API on your behalf.
              </p>
            </div>
          </div>
        </section>

        {/* Section 8: Contact Information */}
        <section className="mb-12 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#8B6914] dark:text-[#E6C98F]" />
            8. Contact Information
          </h2>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            If you have questions, feedback, or concerns regarding this Privacy Policy or our compliance with Google API policies, please reach out to our dedicated privacy contact:
          </p>
          <div className="p-5 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233]">
            <p className="font-serif font-bold text-sm text-[#2C2C2C] dark:text-white">Intelligent Email Assistant Privacy Team</p>
            <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 mt-1">
              Email: <a href="mailto:privacy@intelligentemailassistant.com" className="text-[#8B6914] dark:text-[#E6C98F] underline">privacy@intelligentemailassistant.com</a>
            </p>
            <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 mt-0.5">
              Support: <a href="mailto:support@intelligentemailassistant.com" className="text-[#8B6914] dark:text-[#E6C98F] underline">support@intelligentemailassistant.com</a>
            </p>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-[#E8E0D0] dark:border-[#222233] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B6B6B] dark:text-slate-400 gap-4">
          <p>&copy; {new Date().getFullYear()} Intelligent Email Assistant. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-[#8B6914] dark:hover:text-[#E6C98F] underline">
              Terms of Service
            </Link>
            <span>&bull;</span>
            <Link to="/login" className="hover:text-[#8B6914] dark:hover:text-[#E6C98F] underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
