import { getTranslations } from 'next-intl/server';
import AboutContent from '@/components/pages/AboutContent';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'about' });
  const tNav = await getTranslations({ locale: params.locale, namespace: 'nav' });
  return {
    title: tNav('about'),
    description: t('heroSub'),
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
