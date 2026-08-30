const { google } = require('googleapis');
const User = require('../models/User');
const { decrypt, encrypt } = require('../config/encryption');

/**
 * Creates an authenticated Gmail API client for the given user.
 * Handles token refresh automatically.
 */
const getGmailClient = async (user) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
  );

  const accessToken = decrypt(user.accessToken);
  const refreshToken = user.refreshToken ? decrypt(user.refreshToken) : null;

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  // Handle automatic token refresh
  oauth2Client.on('tokens', async (tokens) => {
    if (tokens.access_token) {
      const encryptedAccessToken = encrypt(tokens.access_token);
      await User.findByIdAndUpdate(user._id, {
        accessToken: encryptedAccessToken,
      });
    }
  });

  return google.gmail({ version: 'v1', auth: oauth2Client });
};

/**
 * Decodes a base64url encoded string
 */
const decodeBase64 = (str) => {
  if (!str) return '';
  return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf-8');
};

/**
 * Extracts the plain text body from a Gmail message part
 */
const extractBody = (payload) => {
  if (!payload) return '';

  // Direct body
  if (payload.body?.data) {
    return decodeBase64(payload.body.data);
  }

  // Multipart — prefer text/plain, fall back to text/html
  if (payload.parts) {
    const textPart = payload.parts.find(p => p.mimeType === 'text/plain');
    if (textPart?.body?.data) return decodeBase64(textPart.body.data);

    const htmlPart = payload.parts.find(p => p.mimeType === 'text/html');
    if (htmlPart?.body?.data) return decodeBase64(htmlPart.body.data);

    // Recurse into nested parts
    for (const part of payload.parts) {
      const body = extractBody(part);
      if (body) return body;
    }
  }

  return '';
};

/**
 * Parses Gmail message headers into a key-value object
 */
const parseHeaders = (headers = []) => {
  return headers.reduce((acc, { name, value }) => {
    acc[name.toLowerCase()] = value;
    return acc;
  }, {});
};

/**
 * Formats a raw Gmail message into a clean object
 */
const formatMessage = (msg) => {
  const headers = parseHeaders(msg.payload?.headers);
  const body = extractBody(msg.payload);
  const snippet = msg.snippet || '';

  return {
    id: msg.id,
    threadId: msg.threadId,
    subject: headers['subject'] || '(No Subject)',
    from: headers['from'] || '',
    to: headers['to'] || '',
    cc: headers['cc'] || '',
    date: headers['date'] || '',
    snippet,
    body,
    labelIds: msg.labelIds || [],
    isUnread: (msg.labelIds || []).includes('UNREAD'),
    isStarred: (msg.labelIds || []).includes('STARRED'),
    isInbox: (msg.labelIds || []).includes('INBOX'),
  };
};

// ─── Gmail Service Functions ──────────────────────────────────────────────────

/**
 * Lists messages in the user's inbox (paginated)
 */
const listMessages = async (user, { pageToken, maxResults = 20, labelIds = ['INBOX'] } = {}) => {
  const gmail = await getGmailClient(user);

  const listRes = await gmail.users.messages.list({
    userId: 'me',
    maxResults,
    pageToken,
    labelIds,
  });

  const messages = listRes.data.messages || [];
  const nextPageToken = listRes.data.nextPageToken;

  if (messages.length === 0) {
    return { messages: [], nextPageToken: null };
  }

  // Fetch full message details in parallel (batch)
  const fullMessages = await Promise.all(
    messages.map(m =>
      gmail.users.messages.get({
        userId: 'me',
        id: m.id,
        format: 'full',
      }).then(res => formatMessage(res.data))
    )
  );

  return { messages: fullMessages, nextPageToken };
};

/**
 * Gets a single email by ID
 */
const getMessage = async (user, messageId) => {
  const gmail = await getGmailClient(user);
  const res = await gmail.users.messages.get({
    userId: 'me',
    id: messageId,
    format: 'full',
  });
  return formatMessage(res.data);
};

/**
 * Gets all messages in a thread
 */
const getThread = async (user, threadId) => {
  const gmail = await getGmailClient(user);
  const res = await gmail.users.threads.get({
    userId: 'me',
    id: threadId,
    format: 'full',
  });

  const messages = (res.data.messages || []).map(formatMessage);
  return { threadId, messages };
};

/**
 * Searches messages using Gmail search query syntax
 */
const searchMessages = async (user, query, maxResults = 20) => {
  const gmail = await getGmailClient(user);

  const listRes = await gmail.users.messages.list({
    userId: 'me',
    q: query,
    maxResults,
  });

  const messages = listRes.data.messages || [];
  if (messages.length === 0) return [];

  const fullMessages = await Promise.all(
    messages.map(m =>
      gmail.users.messages.get({
        userId: 'me',
        id: m.id,
        format: 'full',
      }).then(res => formatMessage(res.data))
    )
  );

  return fullMessages;
};

/**
 * Sends a new email
 */
const sendMessage = async (user, { to, subject, body, cc = '' }) => {
  const gmail = await getGmailClient(user);

  const rawMessage = [
    `To: ${to}`,
    cc ? `Cc: ${cc}` : '',
    `Subject: ${subject}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    body,
  ]
    .filter(Boolean)
    .join('\r\n');

  const encodedMessage = Buffer.from(rawMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: { raw: encodedMessage },
  });

  return res.data;
};

/**
 * Sends a reply to an existing thread
 */
const replyToThread = async (user, { threadId, to, subject, body, messageId }) => {
  const gmail = await getGmailClient(user);

  const rawMessage = [
    `To: ${to}`,
    `Subject: Re: ${subject.startsWith('Re:') ? subject.slice(3).trim() : subject}`,
    `In-Reply-To: ${messageId}`,
    `References: ${messageId}`,
    'Content-Type: text/plain; charset=utf-8',
    'MIME-Version: 1.0',
    '',
    body,
  ].join('\r\n');

  const encodedMessage = Buffer.from(rawMessage)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: encodedMessage,
      threadId,
    },
  });

  return res.data;
};

/**
 * Modifies labels on a message (add/remove)
 */
const modifyLabels = async (user, messageId, { addLabelIds = [], removeLabelIds = [] }) => {
  const gmail = await getGmailClient(user);
  const res = await gmail.users.messages.modify({
    userId: 'me',
    id: messageId,
    requestBody: { addLabelIds, removeLabelIds },
  });
  return res.data;
};

/**
 * Moves a message to trash
 */
const trashMessage = async (user, messageId) => {
  const gmail = await getGmailClient(user);
  const res = await gmail.users.messages.trash({
    userId: 'me',
    id: messageId,
  });
  return res.data;
};

/**
 * Gets the user's Gmail profile
 */
const getProfile = async (user) => {
  const gmail = await getGmailClient(user);
  const res = await gmail.users.getProfile({ userId: 'me' });
  return res.data;
};

module.exports = {
  listMessages,
  getMessage,
  getThread,
  searchMessages,
  sendMessage,
  replyToThread,
  modifyLabels,
  trashMessage,
  getProfile,
};
