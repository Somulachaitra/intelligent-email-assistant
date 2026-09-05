import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Mail, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowLeft, 
  Sparkles, 
  AlertTriangle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const TermsOfServicePage = () => {
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
              to="/privacy"
              className="text-xs font-medium text-[#6B6B6B] dark:text-slate-400 hover:text-[#8B6914] dark:hover:text-[#E6C98F] transition-colors"
            >
              Privacy Policy
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
            <FileText className="w-3.5 h-3.5" />
            <span>Service Agreement & Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#2C2C2C] dark:text-white tracking-tight mb-3">
            Terms of Service
          </h1>
          <p className="text-sm text-[#6B6B6B] dark:text-slate-400">
            Effective Date: <span className="font-medium text-[#2C2C2C] dark:text-slate-200">{lastUpdated}</span> &bull; Last Revised: <span className="font-medium text-[#2C2C2C] dark:text-slate-200">{lastUpdated}</span>
          </p>
        </div>

        {/* Highlight Notice */}
        <div className="mb-10 p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#16161F] border-l-4 border-l-[#8B6914] border-y border-r border-[#E8E0D0] dark:border-[#222233]">
          <h2 className="text-base font-serif font-bold text-[#2C2C2C] dark:text-white flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-[#8B6914] dark:text-[#E6C98F]" />
            Summary of Key Terms
          </h2>
          <p className="text-sm text-[#5C4A32] dark:text-slate-300 leading-relaxed">
            By connecting your Google account with Intelligent Email Assistant, you agree to these Terms. You retain full ownership of your email communications. Our AI features provide assistive suggestions and drafts—you are solely responsible for reviewing and authorizing any outbound emails before they are sent.
          </p>
        </div>

        {/* Section 1: Acceptance */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white">
            1. Acceptance of Terms
          </h2>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            These Terms of Service ("Terms") constitute a legally binding agreement between you ("User", "you") and <strong>Intelligent Email Assistant</strong> ("we", "us", or "our"), governing your access to and use of our web application, tools, and associated services.
          </p>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            By logging in via Google OAuth, connecting your Gmail inbox, or using any feature of the application, you acknowledge that you have read, understood, and agree to be bound by these Terms and our{' '}
            <Link to="/privacy" className="font-semibold text-[#8B6914] dark:text-[#E6C98F] underline">
              Privacy Policy
            </Link>
            . If you do not agree to these Terms, you must not access or use the application.
          </p>
        </section>

        {/* Section 2: Eligibility & Google Account Requirements */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white">
            2. Eligibility & Google Account Integration
          </h2>
          <div className="space-y-2 text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            <p>
              To use Intelligent Email Assistant, you must:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Be at least 18 years of age or the age of majority in your jurisdiction.</li>
              <li>Possess a valid, active Google / Gmail account in good standing.</li>
              <li>Comply with all applicable terms established by Google LLC, including Google's Terms of Service and acceptable use policies.</li>
            </ul>
            <p className="text-xs text-[#6B6B6B] dark:text-slate-400 mt-2">
              Our application connects directly with Google APIs. Any suspension, restriction, or termination of your Google account by Google may affect your ability to access our application.
            </p>
          </div>
        </section>

        {/* Section 3: Description of Service */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white">
            3. Description of Service
          </h2>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            Intelligent Email Assistant provides an AI-augmented executive workspace for your email communications. Key functionalities include:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233]">
              <h4 className="font-serif font-bold text-sm text-[#2C2C2C] dark:text-white mb-1">Inbox Navigation & Management</h4>
              <p className="text-xs text-[#5C4A32] dark:text-slate-300">
                Browsing threads, searching messages, starring important emails, marking read/unread, archiving, and trashing.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233]">
              <h4 className="font-serif font-bold text-sm text-[#2C2C2C] dark:text-white mb-1">AI Summarization</h4>
              <p className="text-xs text-[#5C4A32] dark:text-slate-300">
                Synthesizing long conversations into concise, structured executive summaries and bullet points.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233]">
              <h4 className="font-serif font-bold text-sm text-[#2C2C2C] dark:text-white mb-1">Action Items Extraction</h4>
              <p className="text-xs text-[#5C4A32] dark:text-slate-300">
                Detecting tasks, deadlines, and follow-ups within email bodies to streamline your workflow.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233]">
              <h4 className="font-serif font-bold text-sm text-[#2C2C2C] dark:text-white mb-1">Assisted Composition & Reply</h4>
              <p className="text-xs text-[#5C4A32] dark:text-slate-300">
                Generating contextual reply drafts that you can review, edit, and dispatch via your Gmail account.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Acceptable Use Policy */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#8B6914] dark:text-[#E6C98F]" />
            4. Acceptable Use Policy
          </h2>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            You agree to use Intelligent Email Assistant solely for lawful purposes in accordance with these Terms. You agree NOT to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-[#5C4A32] dark:text-slate-300">
            <li><strong>Transmit Unsolicited Bulk Communications (Spam):</strong> Use the service to send unauthorized spam, chain letters, commercial bulk emails, or unlawful marketing solicitations in violation of CAN-SPAM or other global anti-spam regulations.</li>
            <li><strong>Phishing & Fraud:</strong> Engage in deceptive practices, masquerade as another individual or entity, or craft misleading phishing communications.</li>
            <li><strong>Malicious Code:</strong> Distribute viruses, trojans, worms, logic bombs, or any materials designed to impair or disrupt the software or networks.</li>
            <li><strong>Security Probing:</strong> Attempt to scan, test, probe, or breach system vulnerabilities or bypass authentication controls.</li>
            <li><strong>Reverse Engineering:</strong> Decompile, reverse engineer, disassemble, or derive source code from our services or algorithms.</li>
            <li><strong>Rate Limit Abuse:</strong> Use automated bots, scrapers, or scripts to overload our application servers or third-party APIs.</li>
          </ul>
        </section>

        {/* Section 5: AI Assistive Features & Service Limitations */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#8B6914] dark:text-[#E6C98F]" />
            5. AI Features & Service Limitations
          </h2>
          <div className="p-5 rounded-xl bg-amber-500/10 border-l-4 border-l-[#8B6914] border-y border-r border-[#E8E0D0] dark:border-[#8B6914]/30 space-y-3">
            <h3 className="font-serif font-bold text-sm text-[#8B6914] dark:text-[#E6C98F]">
              Human-in-the-Loop & Verification Disclaimer
            </h3>
            <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 leading-relaxed">
              <strong>1. Assistive Utility:</strong> AI-generated summaries, categorized tags, extracted to-do items, and reply suggestions are generated by machine learning algorithms and are provided solely as assistive productivity aids.
            </p>
            <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 leading-relaxed">
              <strong>2. User Sole Responsibility for Outbound Messages:</strong> You retain complete discretion and sole responsibility for any email message transmitted using the Service. <strong>You must review, verify, and edit all AI-generated drafts for factual accuracy, tone, and appropriateness prior to clicking "Send".</strong>
            </p>
            <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 leading-relaxed">
              <strong>3. Accuracy:</strong> Artificial intelligence outputs may occasionally contain inaccuracies, hallucinations, omissions, or misinterpretations. We make no representations or warranties concerning the absolute accuracy, completeness, or suitability of AI-generated content.
            </p>
          </div>
        </section>

        {/* Section 6: Intellectual Property & User Content */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white">
            6. Intellectual Property & Ownership of Content
          </h2>
          <div className="space-y-3 text-sm text-[#5C4A32] dark:text-slate-300 leading-relaxed">
            <p>
              <strong>Your Content:</strong> You retain all ownership, intellectual property rights, and title to your email messages, contact records, replies, and attachments. We claim no ownership over your communications.
            </p>
            <p>
              <strong>Our Service:</strong> The Intelligent Email Assistant interface, design, software, branding, logos, graphics, and documentation are the exclusive property of Intelligent Email Assistant and its licensors, protected by copyright and intellectual property laws.
            </p>
          </div>
        </section>

        {/* Section 7: Service Availability & Disclaimers */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white">
            7. Service Availability & Modifications
          </h2>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            We strive to provide reliable and consistent availability. However, we do not warrant that service will be uninterrupted, error-free, or entirely free of temporary downtime caused by server upgrades, network disruptions, or third-party API rate limits (such as Google API or AI provider downtime).
          </p>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            We reserve the right to modify, enhance, or discontinue features of the application at any time.
          </p>
        </section>

        {/* Section 8: Termination & Revocation */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white">
            8. Termination & Access Revocation
          </h2>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            You may terminate this agreement at any time by logging out and disconnecting our application from your Google Account via{' '}
            <a 
              href="https://myaccount.google.com/permissions" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-[#8B6914] dark:text-[#E6C98F] underline inline-flex items-center gap-1"
            >
              Google Account Permissions
              <ExternalLink className="w-3 h-3 inline" />
            </a>
            .
          </p>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            We reserve the right to suspend or terminate your access to the service immediately without prior notice if we determine that you have violated these Terms, abused API rate limits, or engaged in fraudulent or harmful conduct.
          </p>
        </section>

        {/* Section 9: Limitation of Liability */}
        <section className="mb-10 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white">
            9. Disclaimer of Warranties & Limitation of Liability
          </h2>
          <div className="space-y-2 text-xs sm:text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300 uppercase">
            <p>
              THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
            </p>
            <p>
              TO THE FULLEST EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT SHALL INTELLIGENT EMAIL ASSISTANT, ITS CREATORS, DIRECTORS, OR PARTNERS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES—INCLUDING LOSS OF PROFITS, DATA, USE, OR GOODWILL—ARISING FROM YOUR USE OR INABILITY TO USE THE SERVICE OR ANY ACTIONS TAKEN BASED UPON AI-GENERATED SUGGESTIONS.
            </p>
          </div>
        </section>

        {/* Section 10: Contact Information */}
        <section className="mb-12 space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2C2C2C] dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#8B6914] dark:text-[#E6C98F]" />
            10. Contact Us
          </h2>
          <p className="text-sm leading-relaxed text-[#5C4A32] dark:text-slate-300">
            If you have any questions or inquiries regarding these Terms of Service, please contact our support team:
          </p>
          <div className="p-5 rounded-xl bg-white dark:bg-[#111118] border border-[#E8E0D0] dark:border-[#222233]">
            <p className="font-serif font-bold text-sm text-[#2C2C2C] dark:text-white">Intelligent Email Assistant Support</p>
            <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 mt-1">
              Email: <a href="mailto:support@intelligentemailassistant.com" className="text-[#8B6914] dark:text-[#E6C98F] underline">support@intelligentemailassistant.com</a>
            </p>
            <p className="text-xs sm:text-sm text-[#5C4A32] dark:text-slate-300 mt-0.5">
              Privacy Inquiries: <a href="mailto:privacy@intelligentemailassistant.com" className="text-[#8B6914] dark:text-[#E6C98F] underline">privacy@intelligentemailassistant.com</a>
            </p>
          </div>
        </section>

        {/* Footer Navigation */}
        <div className="pt-8 border-t border-[#E8E0D0] dark:border-[#222233] flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B6B6B] dark:text-slate-400 gap-4">
          <p>&copy; {new Date().getFullYear()} Intelligent Email Assistant. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-[#8B6914] dark:hover:text-[#E6C98F] underline">
              Privacy Policy
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

export default TermsOfServicePage;
