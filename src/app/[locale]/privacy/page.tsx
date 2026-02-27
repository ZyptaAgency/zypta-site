import { getTranslations } from 'next-intl/server';
import PrivacyContent from '@/components/pages/PrivacyContent';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'privacy' });
  const tNav = await getTranslations({ locale: params.locale, namespace: 'nav' });
  return {
    title: t('title'),
    description: t('intro'),
  };
}

export default function PrivacyPage() {
  return <PrivacyContent />;
}
