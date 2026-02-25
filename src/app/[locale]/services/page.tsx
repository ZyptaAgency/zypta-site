import { getTranslations } from 'next-intl/server';
import ServicesContent from '@/components/pages/ServicesContent';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'services' });
  const tNav = await getTranslations({ locale: params.locale, namespace: 'nav' });
  return {
    title: tNav('services'),
    description: t('intro'),
  };
}

export default function ServicesPage() {
  return <ServicesContent />;
}
