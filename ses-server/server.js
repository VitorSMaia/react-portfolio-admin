import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const app = express();
app.use(cors());
app.use(express.json());

// Rate Limiting: Max 5 requests per hour per IP for the email endpoint
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: { success: false, error: 'Too many requests, please try again later.' }
});

// Middleware: API Key Validation
const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.RELAY_API_KEY) {
        return res.status(403).json({ success: false, error: 'Forbidden: Invalid API Key' });
    }
    next();
};

// Configuração do Cliente SES v2
const sesClient = new SESv2Client({
    region: process.env.AWS_REGION || "us-east-1",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

const transporter = nodemailer.createTransport({
    SES: { sesClient, SendEmailCommand },
});

app.post('/api/send-email', limiter, validateApiKey, async (req, res) => {
    const { name, email, message } = req.body;

    // Basic Input Validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, error: 'Missing required fields' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ success: false, error: 'Invalid email address' });
    }

    console.log(`📡 Recebendo pacote de dados: ${name} <${email}>`);

    try {
        const toEmail = process.env.ADMIN_EMAIL;
        if (!toEmail) {
            throw new Error("ADMIN_EMAIL não está definido no arquivo .env");
        }

        const info = await transporter.sendMail({
            from: 'contato@joaomaia.app.br',
            to: toEmail,
            replyTo: email,
            subject: `🚀 PORTFOLIO_CONTACT: ${name}`,
            text: `Nome: ${name}\nEmail: ${email}\n\nMensagem: ${message}`,
            html: `
        <div style="font-family: monospace; padding: 20px; background-color: #020617; color: #cbd5e1; border: 1px solid #1e293b;">
          <h2 style="color: #06b6d4; border-bottom: 1px solid #0891b2; padding-bottom: 10px;">
            { INITIATE_CONTACT }
          </h2>
          <div style="margin: 20px 0;">
            <p><strong style="color: #22d3ee;">SOURCE_NAME:</strong> ${name}</p>
            <p><strong style="color: #22d3ee;">SOURCE_EMAIL:</strong> ${email}</p>
          </div>
          <div style="background: #0f172a; padding: 15px; border-left: 4px solid #0891b2;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 10px; color: #475569;">
            TRANSMISSION_ID: ${Date.now()} | SECURE_PROTOCOL: SES/SMTP
          </p>
        </div>
      `,
            headers: {
                'X-SES-CONFIGURATION-SET': process.env.SES_CONFIG_SET || 'my-first-configuration-set'
            }
        });

        console.log("✅ TRANSMISSION_COMPLETE: MessageId:", info.messageId);
        res.status(200).json({ success: true, message: 'E-mail enviado via SES SDK!', id: info.messageId });
    } catch (error) {
        console.error("❌ SIGNAL_LOSS: Erro ao enviar e-mail:", error);
        res.status(500).json({
            success: false,
            error: 'Falha na transmissão.',
            details: error.message
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 SES_RELAY_SERVER ativo em http://localhost:${PORT}`);
});
