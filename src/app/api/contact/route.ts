import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const TO_EMAIL = process.env.CONTACT_EMAIL || 'business@zypta.be';
    const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@zypta.be';

    let type: string;
    let data: Record<string, string>;
    let attachments: { filename: string; content: Buffer }[] = [];

    const contentType = request.headers.get('content-type') || '';
    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      type = (formData.get('type') as string) || 'preview';
      data = {
        name: (formData.get('name') as string) || '',
        email: (formData.get('email') as string) || '',
        phone: (formData.get('phone') as string) || '',
        business: (formData.get('business') as string) || '',
        service: (formData.get('service') as string) || '',
        details: (formData.get('details') as string) || '',
        servicesOffered: (formData.get('servicesOffered') as string) || '',
      };
      const photo = formData.get('photo') as File | null;
      const logo = formData.get('logo') as File | null;
      if (photo?.size) attachments.push({ filename: photo.name || 'photo.jpg', content: Buffer.from(await photo.arrayBuffer()) });
      if (logo?.size) attachments.push({ filename: logo.name || 'logo.png', content: Buffer.from(await logo.arrayBuffer()) });
    } else {
      const body = await request.json();
      type = body.type;
      const { type: _, ...rest } = body;
      data = rest;
    }

    if (type === 'contact') {
      await resend.emails.send({
        from: `Zypta Site <${FROM_EMAIL}>`,
        to: TO_EMAIL,
        subject: `📩 Nouveau message de ${data.name} — ${data.subject}`,
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0f0a1a; color: #e0e0e0; border-radius: 16px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #c84bff, #ff2d8f); padding: 24px 32px;">
              <h1 style="color: white; margin: 0; font-size: 22px;">📩 Nouveau message de contact</h1>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 12px 0; color: #a0a0a0; width: 120px;">Nom</td><td style="padding: 12px 0; color: white; font-weight: 600;">${escapeHtml(data.name || '')}</td></tr>
                <tr><td style="padding: 12px 0; color: #a0a0a0;">Email</td><td style="padding: 12px 0; color: white; font-weight: 600;">${escapeHtml(data.email || '')}</td></tr>
                <tr><td style="padding: 12px 0; color: #a0a0a0;">Sujet</td><td style="padding: 12px 0; color: white; font-weight: 600;">${escapeHtml(data.subject || '')}</td></tr>
              </table>
              <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #a0a0a0; margin: 0 0 8px; font-size: 13px;">Message</p>
                <p style="color: white; margin: 0; line-height: 1.6;">${escapeHtml(data.message || '')}</p>
              </div>
            </div>
          </div>
        `,
      });
    } else if (type === 'preview') {
      await resend.emails.send({
        from: `Zypta Site <${FROM_EMAIL}>`,
        to: TO_EMAIL,
        subject: `🎨 Nouvelle demande d'aperçu — ${data.business}`,
        attachments: attachments.length ? attachments : undefined,
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0f0a1a; color: #e0e0e0; border-radius: 16px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #c84bff, #6228d7); padding: 24px 32px;">
              <h1 style="color: white; margin: 0; font-size: 22px;">🎨 Nouvelle demande d'aperçu</h1>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 12px 0; color: #a0a0a0; width: 140px;">Nom</td><td style="padding: 12px 0; color: white; font-weight: 600;">${escapeHtml(data.name)}</td></tr>
                <tr><td style="padding: 12px 0; color: #a0a0a0;">Email</td><td style="padding: 12px 0; color: white; font-weight: 600;">${escapeHtml(data.email)}</td></tr>
                <tr><td style="padding: 12px 0; color: #a0a0a0;">Téléphone</td><td style="padding: 12px 0; color: white; font-weight: 600;">${escapeHtml(data.phone || '—')}</td></tr>
                <tr><td style="padding: 12px 0; color: #a0a0a0;">Activité</td><td style="padding: 12px 0; color: white; font-weight: 600;">${escapeHtml(data.business)}</td></tr>
                <tr><td style="padding: 12px 0; color: #a0a0a0;">Service souhaité</td><td style="padding: 12px 0; color: white; font-weight: 600;">${escapeHtml(data.service)}</td></tr>
              </table>
              ${data.servicesOffered ? `
              <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #a0a0a0; margin: 0 0 8px; font-size: 13px;">Services offerts</p>
                <p style="color: white; margin: 0; line-height: 1.6;">${escapeHtml(data.servicesOffered)}</p>
              </div>` : ''}
              ${data.details ? `
              <div style="margin-top: 24px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
                <p style="color: #a0a0a0; margin: 0 0 8px; font-size: 13px;">Détails du projet</p>
                <p style="color: white; margin: 0; line-height: 1.6;">${escapeHtml(data.details)}</p>
              </div>` : ''}
              ${attachments.length ? `<p style="color: #a0a0a0; margin-top: 24px; font-size: 13px;">📎 ${attachments.length} fichier(s) joint(s)</p>` : ''}
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as { message?: string; statusCode?: number };
    console.error('Email send error:', err);
    return NextResponse.json(
      { error: 'Failed to send email', details: err?.message || String(error) },
      { status: 500 }
    );
  }
}
