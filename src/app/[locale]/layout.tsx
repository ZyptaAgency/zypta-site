import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Syne, DM_Sans } from 'next/font/google';
import localFont from 'next/font/local';
import '../globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import StarBackground from '@/components/StarBackground';

const SITE_URL = 'https://zypta.be';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const ethnocentric = localFont({
  src: '../../fonts/ethnocentric.otf',
  variable: '--font-ethno',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: 'seo' });
  const defaultTitle = locale === 'fr' ? `${t('siteName')} — Agence digitale Belgique` : `${t('siteName')} — Digital Agency Belgium`;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: defaultTitle,
      template: `${t('siteName')} | %s`,
    },
    description: t('siteDescription'),
    keywords: ['Zypta', 'agence digitale', 'agence web Belgique', 'création site web', 'SEO', 'e-commerce', 'branding', 'Bruxelles'],
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_BE' : 'en_BE',
      siteName: t('siteName'),
      title: defaultTitle,
      description: t('siteDescription'),
    },
    twitter: {
      card: 'summary_large_image',
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!routing.locales.includes(locale as 'fr' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zypta',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: 'Agence digitale en Belgique - Sites web, e-commerce, SEO, branding',
    address: { '@type': 'PostalAddress', addressLocality: 'Bruxelles', addressCountry: 'BE' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+32-487-10-29-28',
      contactType: 'customer service',
      areaServed: 'BE',
    },
  };

  return (
    <html lang={locale} className={`${syne.variable} ${dmSans.variable} ${ethnocentric.variable}`}>
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-body antialiased">
        <NextIntlClientProvider messages={messages}>
          <StarBackground />
          <Navbar />
          <main className="min-h-screen relative z-10">
            {children}
          </main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
