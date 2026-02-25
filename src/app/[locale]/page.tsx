import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import MarqueeBand from '@/components/home/MarqueeBand';
import HowItWorks from '@/components/home/HowItWorks';
import ForWho from '@/components/home/ForWho';
import WhyUs from '@/components/home/WhyUs';
import FinalCta from '@/components/home/FinalCta';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'hero' });
  const tNav = await getTranslations({ locale: params.locale, namespace: 'nav' });
  return {
    title: tNav('home'),
    description: t('sub'),
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeBand />
      <HowItWorks />
      <ForWho />
      <WhyUs />
      <FinalCta />
    </>
  );
}
