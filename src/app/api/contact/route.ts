import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const TO_EMAIL = process.env.CONTACT_EMAIL || 'contact@zypta.be';
    const body = await request.json();
    const { type, ...data } = body;

    if (type === 'contact') {
      await resend.emails.send({
        from: 'Zypta Site <onboarding@resend.dev>',
        to: TO_EMAIL,
        subject: `📩 Nouveau message de ${data.name} — ${data.subject}`,
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0f0a1a; color: #e0e0e0; border-radius: 16px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #c84bff, #ff2d8f); padding: 24px 32px;">
              <h1 style="color: white; margin: 0; font-size: 22px;">📩 Nouveau message de contact</h1>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 12px 0; color: #a0a0a0; width: 120px;">Nom</td><td style="padding: 12px 0; color: white; font-weight: 600;">${data.name}</td></tr>
                <tr><td style="padding: 12px 0; color: #a0a0a0;">Email</td><td style="padding: 12px 0; color: white; font-weight: 600;">${data.email}</td></tr>
                <tr><td style="padding: 12px 0; color: #a0a0a0;">Sujet</td><td style="padding: 12px 0; color: white; font-weight: 600;">${data.subject}</td></tr>
              </table>
              <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #a0a0a0; margin: 0 0 8px; font-size: 13px;">Message</p>
                <p style="color: white; margin: 0; line-height: 1.6;">${data.message}</p>
              </div>
            </div>
          </div>
        `,
      });
    } else if (type === 'preview') {
      await resend.emails.send({
        from: 'Zypta Site <onboarding@resend.dev>',
        to: TO_EMAIL,
        subject: `🎨 Nouvelle demande d'aperçu — ${data.business}`,
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0f0a1a; color: #e0e0e0; border-radius: 16px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #c84bff, #6228d7); padding: 24px 32px;">
              <h1 style="color: white; margin: 0; font-size: 22px;">🎨 Nouvelle demande d'aperçu</h1>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 12px 0; color: #a0a0a0; width: 120px;">Nom</td><td style="padding: 12px 0; color: white; font-weight: 600;">${data.name}</td></tr>
                <tr><td style="padding: 12px 0; color: #a0a0a0;">Email</td><td style="padding: 12px 0; color: white; font-weight: 600;">${data.email}</td></tr>
                <tr><td style="padding: 12px 0; color: #a0a0a0;">Téléphone</td><td style="padding: 12px 0; color: white; font-weight: 600;">${data.phone || '—'}</td></tr>
                <tr><td style="padding: 12px 0; color: #a0a0a0;">Activité</td><td style="padding: 12px 0; color: white; font-weight: 600;">${data.business}</td></tr>
                <tr><td style="padding: 12px 0; color: #a0a0a0;">Service</td><td style="padding: 12px 0; color: white; font-weight: 600;">${data.service}</td></tr>
              </table>
              ${data.details ? `
              <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #a0a0a0; margin: 0 0 8px; font-size: 13px;">Détails du projet</p>
                <p style="color: white; margin: 0; line-height: 1.6;">${data.details}</p>
              </div>` : ''}
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
