const Anthropic = require('@anthropic-ai/sdk');

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 1024;

/**
 * Helper: Call Claude with a system prompt and user message
 */
const callClaude = async (systemPrompt, userMessage, maxTokens = MAX_TOKENS) => {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });
  return response.content[0].text.trim();
};

// ─── AI Feature Functions ─────────────────────────────────────────────────────

/**
 * Summarizes an email body into 3–5 bullet points
 */
const summarizeEmail = async (emailBody, subject = '') => {
  const system = `You are an expert email summarizer. Your task is to extract the key information from emails and present them as clear, concise bullet points. Always respond with exactly 3 to 5 bullet points. Each bullet should be one sentence maximum. Start each bullet with "•".`;

  const user = `Please summarize this email:

Subject: ${subject}

${emailBody}`;

  return callClaude(system, user);
};

/**
 * Generates a contextual reply draft
 */
const generateReply = async (emailBody, subject = '', senderName = '') => {
  const system = `You are an expert email assistant. Generate a professional, helpful, and natural-sounding reply to the email provided. The reply should be concise, address the main points, and maintain a professional but friendly tone. Do not include any subject line — just the reply body text. Sign off naturally.`;

  const user = `Please write a reply to this email:

From: ${senderName}
Subject: ${subject}

${emailBody}`;

  return callClaude(system, user, 512);
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

  const system = `You are an expert email assistant. Generate a reply that is ${toneDesc}. Do not include any subject line — just the reply body text. Match the requested tone precisely.`;

  const user = `Write a ${tone} reply to this email:

From: ${senderName}
Subject: ${subject}

${emailBody}`;

  return callClaude(system, user, 512);
};

/**
 * Classifies an email into a category
 */
const classifyEmail = async (emailBody, subject = '', sender = '') => {
  const system = `You are an email classifier. Classify the given email into exactly ONE of these categories: Work, Personal, Finance, Newsletter, Spam, Social, Travel, Shopping, Other.

Respond with a JSON object in this exact format:
{
  "category": "Work",
  "confidence": 0.95,
  "reason": "One sentence explanation"
}`;

  const user = `Classify this email:

From: ${sender}
Subject: ${subject}

${emailBody.substring(0, 1000)}`;

  const result = await callClaude(system, user, 256);

  try {
    return JSON.parse(result);
  } catch {
    return { category: 'Other', confidence: 0.5, reason: 'Classification unclear' };
  }
};

/**
 * Explains an email in plain language
 */
const explainEmail = async (emailBody, subject = '') => {
  const system = `You are a helpful assistant that explains emails in simple, plain language. Imagine you are explaining this email to someone who is not familiar with business jargon. Be clear, friendly, and avoid technical terms. Keep your explanation to 2-3 short paragraphs.`;

  const user = `Please explain this email in simple terms:

Subject: ${subject}

${emailBody}`;

  return callClaude(system, user, 512);
};

/**
 * Extracts action items and dates from an email
 */
const extractActions = async (emailBody, subject = '') => {
  const system = `You are an expert at extracting action items and important dates from emails. 

Respond with a JSON object in this exact format:
{
  "actionItems": [
    { "task": "Task description", "priority": "high|medium|low", "dueDate": "YYYY-MM-DD or null" }
  ],
  "dates": [
    { "description": "What the date refers to", "date": "YYYY-MM-DD or natural language" }
  ],
  "hasActionItems": true
}

If there are no action items or dates, return empty arrays and hasActionItems: false.`;

  const user = `Extract action items and dates from this email:

Subject: ${subject}

${emailBody}`;

  const result = await callClaude(system, user, 512);

  try {
    return JSON.parse(result);
  } catch {
    return { actionItems: [], dates: [], hasActionItems: false };
  }
};

/**
 * Detects spam or phishing indicators in an email
 */
const detectSpam = async (emailBody, subject = '', sender = '') => {
  const system = `You are a cybersecurity expert specializing in email threat detection. Analyze the given email for spam, phishing, or scam indicators.

Respond with a JSON object in this exact format:
{
  "isSpam": false,
  "isPhishing": false,
  "riskLevel": "none|low|medium|high|critical",
  "riskScore": 0.05,
  "indicators": ["List of suspicious elements found"],
  "recommendation": "One sentence advice to the user"
}`;

  const user = `Analyze this email for spam/phishing:

From: ${sender}
Subject: ${subject}

${emailBody.substring(0, 2000)}`;

  const result = await callClaude(system, user, 512);

  try {
    return JSON.parse(result);
  } catch {
    return { isSpam: false, isPhishing: false, riskLevel: 'none', riskScore: 0, indicators: [], recommendation: 'Email appears safe.' };
  }
};

/**
 * Detects the priority level of an email
 */
const detectPriority = async (emailBody, subject = '', sender = '') => {
  const system = `You are an email priority expert. Determine how urgently this email needs a response or action.

Respond with a JSON object in this exact format:
{
  "priority": "high|medium|low",
  "score": 0.85,
  "reason": "One sentence explanation",
  "suggestedResponseTime": "Immediately|Within 24 hours|Within a week|No response needed"
}`;

  const user = `Determine the priority of this email:

From: ${sender}
Subject: ${subject}

${emailBody.substring(0, 1500)}`;

  const result = await callClaude(system, user, 256);

  try {
    return JSON.parse(result);
  } catch {
    return { priority: 'medium', score: 0.5, reason: 'Standard email', suggestedResponseTime: 'Within 24 hours' };
  }
};

/**
 * Corrects grammar and improves the user's email draft
 */
const grammarCorrect = async (emailBody) => {
  const system = `You are a professional email editor. Improve the grammar, clarity, and professionalism of the provided email text. Fix any grammatical errors, improve sentence structure, and make the language more polished — but keep the original meaning and intent intact. Return only the improved email text, no explanations.`;

  const user = `Please improve this email:

${emailBody}`;

  return callClaude(system, user, 1024);
};

/**
 * Suggests subject lines for a new email
 */
const suggestSubject = async (emailBody) => {
  const system = `You are an email subject line expert. Generate exactly 3 compelling, clear subject line options for the provided email body. Each subject line should be:
- Concise (max 60 characters)
- Descriptive and action-oriented
- Different in style/angle

Respond with a JSON array of 3 strings:
["Subject 1", "Subject 2", "Subject 3"]`;

  const user = `Suggest 3 subject lines for this email:

${emailBody.substring(0, 500)}`;

  const result = await callClaude(system, user, 256);

  try {
    return JSON.parse(result);
  } catch {
    return ['Email from Intelligent Email Assistant', 'Following up', 'Quick message'];
  }
};

module.exports = {
  summarizeEmail,
  generateReply,
  generateToneReply,
  classifyEmail,
  explainEmail,
  extractActions,
  detectSpam,
  detectPriority,
  grammarCorrect,
  suggestSubject,
};
