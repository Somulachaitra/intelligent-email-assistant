const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

/**
 * Helper to execute Gemini generation with error handling
 */
const generateWithGemini = async (prompt) => {
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
};

/**
 * Helper to strip markdown JSON code fences if Gemini wraps JSON responses
 */
const parseJSONSafely = (text, fallback) => {
  try {
    const cleaned = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
    return JSON.parse(cleaned);
  } catch (err) {
    return fallback;
  }
};

// ─── AI Feature Functions ─────────────────────────────────────────────────────

/**
 * Summarizes an email body into 3–5 bullet points
 */
const summarizeEmail = async (emailBody, subject = '') => {
  const prompt = `You are an expert email summarizer. Extract the key information from this email and present them as clear, concise bullet points. Always respond with exactly 3 to 5 bullet points. Each bullet should be one sentence maximum. Start each bullet with "•".

Subject: ${subject}

Email Content:
${emailBody}`;

  return generateWithGemini(prompt);
};

/**
 * Generates a contextual reply draft
 */
const generateReply = async (emailBody, subject = '', senderName = '') => {
  const prompt = `You are an expert email assistant. Generate a professional, helpful, and natural-sounding reply to the email provided. The reply should be concise, address the main points, and maintain a professional but friendly tone. Do not include any subject line — just the reply body text. Sign off naturally.

From: ${senderName}
Subject: ${subject}

Email Content:
${emailBody}`;

  return generateWithGemini(prompt);
};

/**
 * Generates a reply with a specific tone
 */
const generateToneReply = async (emailBody, subject = '', senderName = '', tone = 'professional') => {
  const toneDescriptions = {
    professional: 'formal, polished, and business-appropriate',
    friendly: 'warm, personable, and conversational',
    formal: 'very formal, structured, and deferential',
    concise: 'brief, to-the-point, and direct — no fluff',
  };

  const toneDesc = toneDescriptions[tone.toLowerCase()] || toneDescriptions.professional;

  const prompt = `You are an expert email assistant. Generate a reply that is ${toneDesc}. Do not include any subject line — just the reply body text. Match the requested tone precisely.

From: ${senderName}
Subject: ${subject}
Tone: ${tone}

Email Content:
${emailBody}`;

  return generateWithGemini(prompt);
};

/**
 * Classifies an email into a category
 */
const classifyEmail = async (emailBody, subject = '', sender = '') => {
  const prompt = `You are an email classifier. Classify the given email into exactly ONE of these categories: Work, Personal, Finance, Newsletter, Spam, Social, Travel, Shopping, Other.

Respond with ONLY a raw JSON object in this exact format (no markdown fences, no extra text):
{
  "category": "Work",
  "confidence": 0.95,
  "reason": "One sentence explanation"
}

From: ${sender}
Subject: ${subject}

Email Content:
${emailBody.substring(0, 1500)}`;

  const text = await generateWithGemini(prompt);
  return parseJSONSafely(text, { category: 'Other', confidence: 0.5, reason: 'Classification unclear' });
};

/**
 * Explains an email in plain language
 */
const explainEmail = async (emailBody, subject = '') => {
  const prompt = `You are a helpful assistant that explains emails in simple, plain language. Imagine you are explaining this email to someone who is not familiar with business jargon. Be clear, friendly, and avoid technical terms. Keep your explanation to 2-3 short paragraphs.

Subject: ${subject}

Email Content:
${emailBody}`;

  return generateWithGemini(prompt);
};

/**
 * Extracts action items and dates from an email
 */
const extractActions = async (emailBody, subject = '') => {
  const prompt = `You are an expert at extracting action items and important dates from emails.

Respond with ONLY a raw JSON object in this exact format (no markdown fences, no extra text):
{
  "actionItems": [
    { "task": "Task description", "priority": "high|medium|low", "dueDate": "YYYY-MM-DD or null" }
  ],
  "dates": [
    { "description": "What the date refers to", "date": "YYYY-MM-DD or natural language" }
  ],
  "hasActionItems": true
}

If there are no action items or dates, return empty arrays and hasActionItems: false.

Subject: ${subject}

Email Content:
${emailBody}`;

  const text = await generateWithGemini(prompt);
  return parseJSONSafely(text, { actionItems: [], dates: [], hasActionItems: false });
};

/**
 * Extracts only dates/deadlines from an email
 */
const extractDates = async (emailBody, subject = '') => {
  const data = await extractActions(emailBody, subject);
  return data.dates || [];
};

/**
 * Detects spam or phishing indicators in an email
 */
const detectSpam = async (emailBody, subject = '', sender = '') => {
  const prompt = `You are a cybersecurity expert specializing in email threat detection. Analyze the given email for spam, phishing, or scam indicators.

Respond with ONLY a raw JSON object in this exact format (no markdown fences, no extra text):
{
  "isSpam": false,
  "isPhishing": false,
  "riskLevel": "none|low|medium|high|critical",
  "riskScore": 0.05,
  "indicators": ["List of suspicious elements found"],
  "recommendation": "One sentence advice to the user"
}

From: ${sender}
Subject: ${subject}

Email Content:
${emailBody.substring(0, 2000)}`;

  const text = await generateWithGemini(prompt);
  return parseJSONSafely(text, {
    isSpam: false,
    isPhishing: false,
    riskLevel: 'none',
    riskScore: 0,
    indicators: [],
    recommendation: 'Email appears safe.',
  });
};

/**
 * Detects the priority level of an email
 */
const detectPriority = async (emailBody, subject = '', sender = '') => {
  const prompt = `You are an email priority expert. Determine how urgently this email needs a response or action.

Respond with ONLY a raw JSON object in this exact format (no markdown fences, no extra text):
{
  "priority": "high|medium|low",
  "score": 0.85,
  "reason": "One sentence explanation",
  "suggestedResponseTime": "Immediately|Within 24 hours|Within a week|No response needed"
}

From: ${sender}
Subject: ${subject}

Email Content:
${emailBody.substring(0, 1500)}`;

  const text = await generateWithGemini(prompt);
  return parseJSONSafely(text, {
    priority: 'medium',
    score: 0.5,
    reason: 'Standard email',
    suggestedResponseTime: 'Within 24 hours',
  });
};

/**
 * Corrects grammar and improves the user's email draft
 */
const grammarCorrect = async (emailBody) => {
  const prompt = `You are a professional email editor. Improve the grammar, clarity, and professionalism of the provided email text. Fix any grammatical errors, improve sentence structure, and make the language more polished — but keep the original meaning and intent intact. Return only the improved email text, no explanations.

Email Text:
${emailBody}`;

  return generateWithGemini(prompt);
};

/**
 * Suggests subject lines for a new email
 */
const suggestSubject = async (emailBody) => {
  const prompt = `You are an email subject line expert. Generate exactly 3 compelling, clear subject line options for the provided email body. Each subject line should be:
- Concise (max 60 characters)
- Descriptive and action-oriented
- Different in style/angle

Respond with ONLY a raw JSON array of 3 strings (no markdown fences, no extra text):
["Subject 1", "Subject 2", "Subject 3"]

Email Content:
${emailBody.substring(0, 500)}`;

  const text = await generateWithGemini(prompt);
  return parseJSONSafely(text, ['Email from Intelligent Email Assistant', 'Following up', 'Quick message']);
};

module.exports = {
  summarizeEmail,
  generateReply,
  generateToneReply,
  classifyEmail,
  explainEmail,
  extractActions,
  extractDates,
  detectSpam,
  detectPriority,
  grammarCorrect,
  suggestSubject,
};
