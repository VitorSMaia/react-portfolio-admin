import { NextRequest, NextResponse } from 'next/server';
import { BrevoClient } from '@getbrevo/brevo';
import { supabase } from '@/lib/supabase';

const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 8000;

function escapeHtml(input: string) {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return NextResponse.json({ success: false, error: 'Missing or invalid fields' }, { status: 400 });
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
  }

  if (
    trimmedName.length > MAX_NAME ||
    trimmedEmail.length > MAX_EMAIL ||
    trimmedMessage.length > MAX_MESSAGE
  ) {
    return NextResponse.json({ success: false, error: 'Payload too large' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
  }

  const safeName = escapeHtml(trimmedName);
  const safeEmail = escapeHtml(trimmedEmail);
  const safeMessage = escapeHtml(trimmedMessage);

  // 1. Salvar no Supabase
  const { error: dbError } = await supabase
    .from('contact_messages')
    .insert([{ name: trimmedName, email: trimmedEmail, message: trimmedMessage, status: 'pending' }]);

  if (dbError) {
    console.error('Supabase insert error:', dbError);
    return NextResponse.json({ success: false, error: 'Erro ao salvar mensagem' }, { status: 500 });
  }

  // 2. Enviar email via Brevo
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME ?? 'Portfolio';
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL;

  if (!apiKey || !senderEmail || !receiverEmail) {
    console.error('Missing Brevo env vars');
    return NextResponse.json({ success: false, error: 'Server misconfiguration' }, { status: 500 });
  }

  try {
    const brevo = new BrevoClient({ apiKey });

    await brevo.transactionalEmails.sendTransacEmail({
      sender: { name: senderName, email: senderEmail },
      to: [{ email: receiverEmail }],
      replyTo: { email: trimmedEmail, name: trimmedName },
      subject: `🚀 PORTFOLIO_CONTACT: ${trimmedName}`,
      htmlContent: `
        <div style="font-family:monospace;padding:20px;background:#020617;color:#cbd5e1;border:1px solid #1e293b;">
          <h2 style="color:#06b6d4;border-bottom:1px solid #0891b2;padding-bottom:10px;">{ INITIATE_CONTACT }</h2>
          <p><strong style="color:#22d3ee;">SOURCE_NAME:</strong> ${safeName}</p>
          <p><strong style="color:#22d3ee;">SOURCE_EMAIL:</strong> ${safeEmail}</p>
          <div style="background:#0f172a;padding:15px;border-left:4px solid #0891b2;">
            <p style="white-space:pre-wrap;">${safeMessage}</p>
          </div>
          <p style="margin-top:20px;font-size:10px;color:#475569;">TRANSMISSION_ID: ${Date.now()}</p>
        </div>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Brevo send error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Falha na transmissão.',
        ...(process.env.NODE_ENV !== 'production' && {
          details: error instanceof Error ? error.message : String(error),
        }),
      },
      { status: 500 }
    );
  }
}
