import { NextResponse } from 'next/server';
import { Resend } from 'resend';

interface BookingPayload {
  name: string;
  email: string;
  phone: string;
  isWhatsapp: boolean;
  service: string;
  date: string;
  time: string;
  notes?: string;
  returning?: boolean;
}

export async function POST(req: Request) {
  let body: BookingPayload;
  try {
    body = (await req.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.name || !body.email || !body.phone || !body.service || !body.date || !body.time) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const html = `
    <div style="font-family: Georgia, serif; max-width: 580px; margin: 0 auto; color: #1a5f6f;">
      <h2 style="font-weight: 400; letter-spacing: 0.02em; border-bottom: 1px solid #c9a961; padding-bottom: 12px;">
        New Booking Request
      </h2>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 10px 0; color: #c9a961; text-transform: uppercase; font-size: 11px; letter-spacing: 0.2em;">Name</td><td>${escape(body.name)}</td></tr>
        <tr><td style="padding: 10px 0; color: #c9a961; text-transform: uppercase; font-size: 11px; letter-spacing: 0.2em;">Email</td><td>${escape(body.email)}</td></tr>
        <tr><td style="padding: 10px 0; color: #c9a961; text-transform: uppercase; font-size: 11px; letter-spacing: 0.2em;">Phone</td><td>${escape(body.phone)} ${body.isWhatsapp ? '(WhatsApp)' : ''}</td></tr>
        <tr><td style="padding: 10px 0; color: #c9a961; text-transform: uppercase; font-size: 11px; letter-spacing: 0.2em;">Service</td><td>${escape(body.service)}</td></tr>
        <tr><td style="padding: 10px 0; color: #c9a961; text-transform: uppercase; font-size: 11px; letter-spacing: 0.2em;">When</td><td>${escape(body.date)} · ${escape(body.time)}</td></tr>
        <tr><td style="padding: 10px 0; color: #c9a961; text-transform: uppercase; font-size: 11px; letter-spacing: 0.2em;">Returning</td><td>${body.returning ? 'Yes — apply 5% off' : 'No'}</td></tr>
      </table>
      ${body.notes ? `<p style="margin-top: 24px; padding: 16px; border-left: 2px solid #c9a961; background: #faf7f2;">${escape(body.notes)}</p>` : ''}
    </div>
  `;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.BOOKING_TO_EMAIL;
  const from = process.env.BOOKING_FROM_EMAIL ?? 'bookings@morelaserspa.com';

  if (!apiKey || !to) {
    console.warn('[booking] Resend not configured — logging only.', body);
    return NextResponse.json({ ok: true, queued: true });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      reply_to: body.email,
      subject: `Booking — ${body.name} · ${body.date} ${body.time}`,
      html
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[booking] send failed', err);
    return NextResponse.json({ error: 'Send failed' }, { status: 500 });
  }
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
