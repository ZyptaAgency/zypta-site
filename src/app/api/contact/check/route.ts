import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const hasKey = !!process.env.RESEND_API_KEY;
  const hasEmail = !!process.env.CONTACT_EMAIL;
  return NextResponse.json({
    RESEND_API_KEY: hasKey ? '✓ set' : '✗ missing',
    CONTACT_EMAIL: hasEmail ? '✓ set' : '✗ missing',
    CONTACT_EMAIL_value: process.env.CONTACT_EMAIL || '(not set)',
  });
}
