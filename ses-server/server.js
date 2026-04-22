import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import nodemailer from 'nodemailer';
import 'dotenv/config';
import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

const trustProxy = Math.min(Number(process.env.TRUST_PROXY ?? '1'), 2);
if (trustProxy > 0) {
  app.set('trust proxy', trustProxy);
}

app.disable('x-powered-by');

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false,
  }),
);

const allowedOrigins = (process.env.CORS_ORIGINS ||
  'http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      return cb(null, allowedOrigins.includes(origin));
    },
    credentials: false,
    methods: ['POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key'],
  }),
);

app.use(express.json({ limit: '48kb' }));

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX ?? '5'),
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, error: 'Too many requests, please try again later.' },
});

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== process.env.RELAY_API_KEY) {
    return res.status(403).json({ success: false, error: 'Forbidden: Invalid API Key' });
  }
  next();
};

function escapeHtml(input) {
  return String(input)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 8000;

const sesClient = new SESv2Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const transporter = nodemailer.createTransport({
  SES: { sesClient, SendEmailCommand },
});

app.post('/api/send-email', limiter, validateApiKey, async (req, res) => {
  const { name, email, message } = req.body ?? {};

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return res.status(400).json({ success: false, error: 'Missing or invalid field types' });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  if (trimmedName.length > MAX_NAME || trimmedEmail.length > MAX_EMAIL || trimmedMessage.length > MAX_MESSAGE) {
    return res.status(400).json({ success: false, error: 'Payload too large' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return res.status(400).json({ success: false, error: 'Invalid email address' });
  }

  const safeName = escapeHtml(trimmedName);
  const safeEmail = escapeHtml(trimmedEmail);
  const safeMessage = escapeHtml(trimmedMessage);

  try {
    const toEmail = process.env.ADMIN_EMAIL;
    if (!toEmail) {
      throw new Error('ADMIN_EMAIL não está definido no arquivo .env');
    }

    const info = await transporter.sendMail({
      from: 'contato@joaomaia.app.br',
      to: toEmail,
      replyTo: trimmedEmail,
      subject: `🚀 PORTFOLIO_CONTACT: ${trimmedName}`,
      text: `Nome: ${trimmedName}\nEmail: ${trimmedEmail}\n\nMensagem: ${trimmedMessage}`,
      html: `
        <div style="font-family: monospace; padding: 20px; background-color: #020617; color: #cbd5e1; border: 1px solid #1e293b;">
          <h2 style="color: #06b6d4; border-bottom: 1px solid #0891b2; padding-bottom: 10px;">
            { INITIATE_CONTACT }
          </h2>
          <div style="margin: 20px 0;">
            <p><strong style="color: #22d3ee;">SOURCE_NAME:</strong> ${safeName}</p>
            <p><strong style="color: #22d3ee;">SOURCE_EMAIL:</strong> ${safeEmail}</p>
          </div>
          <div style="background: #0f172a; padding: 15px; border-left: 4px solid #0891b2;">
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="margin-top: 20px; font-size: 10px; color: #475569;">
            TRANSMISSION_ID: ${Date.now()} | SECURE_PROTOCOL: SES/SMTP
          </p>
        </div>
      `,
      headers: {
        'X-SES-CONFIGURATION-SET': process.env.SES_CONFIG_SET || 'my-first-configuration-set',
      },
    });

    res.status(200).json({ success: true, message: 'E-mail enviado via SES SDK!', id: info.messageId });
  } catch (error) {
    console.error('❌ SIGNAL_LOSS: Erro ao enviar e-mail:', error);
    res.status(500).json({
      success: false,
      error: 'Falha na transmissão.',
      ...(isProduction ? {} : { details: error instanceof Error ? error.message : String(error) }),
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 SES_RELAY_SERVER ativo em http://localhost:${PORT}`);
});
