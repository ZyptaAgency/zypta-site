import { getTranslations } from 'next-intl/server';
import ContactContent from '@/components/pages/ContactContent';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'contact' });
  const tNav = await getTranslations({ locale: params.locale, namespace: 'nav' });
  return {
    title: tNav('contact'),
    description: t('sub'),
  };
}

export default function ContactPage() {
  return <ContactContent />;
}
