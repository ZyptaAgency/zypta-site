import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import HeroSection from '@/components/home/HeroSection';
import HomeIntro from '@/components/home/HomeIntro';
import HomeServices from '@/components/home/HomeServices';
import MarqueeBand from '@/components/home/MarqueeBand';
import HowItWorks from '@/components/home/HowItWorks';
import ForWho from '@/components/home/ForWho';
import WhyUs from '@/components/home/WhyUs';
import FinalCta from '@/components/home/FinalCta';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'seo' });
  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HomeIntro />
      <MarqueeBand />
      <HomeServices />
      <HowItWorks />
      <ForWho />
      <WhyUs />
      <FinalCta />
    </>
  );
}
