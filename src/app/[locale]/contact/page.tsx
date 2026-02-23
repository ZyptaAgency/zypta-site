import { getTranslations } from 'next-intl/server';
import ContactContent from '@/components/pages/ContactContent';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'contact' });
  return {
    title: 'ZYPTA — ' + t('headline'),
    description: t('sub'),
  };
}

export default function ContactPage() {
  return <ContactContent />;
}
