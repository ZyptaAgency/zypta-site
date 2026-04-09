import { getTranslations } from 'next-intl/server';
import PricingSection from '@/components/PricingSection';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'pricing' });
  const tNav = await getTranslations({ locale: params.locale, namespace: 'nav' });
  return {
    title: tNav('pricing'),
    description: t('intro'),
  };
}

export default function PricingPage() {
  return (
    <div className="pt-28">
      <PricingSection />
    </div>
  );
}
