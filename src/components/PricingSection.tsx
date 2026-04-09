'use client';

import { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import WhatsAppCtaLink from '@/components/WhatsAppCtaLink';
import { readStoredFormule, writeStoredFormule } from '@/lib/pricing-prefs';
import {
  Check,
  ArrowRight,
  Lock,
  ChevronDown,
  Sparkles,
  Globe,
  FileText,
  Calendar,
  Palette,
  Wrench,
  Plus,
} from 'lucide-react';

const iconMap = {
  FileText,
  Globe,
  Calendar,
  Palette,
  Wrench,
} as const;

type IconName = keyof typeof iconMap;

type PlanExample = { name: string; desc: string; href: string };
type PlanRaw = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  priceNote: string;
  cta: string;
  ctaQuery: string;
  highlighted: boolean;
  badge: string | null;
  features: string[];
  examples: PlanExample[];
};

type AddonRaw = {
  icon: IconName;
  label: string;
  price: string;
  description: string;
  slug: string;
};

type FaqRaw = { q: string; a: string };

export default function PricingSection() {
  const t = useTranslations('pricing');
  const tc = useTranslations('contact');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  const plans = useMemo(() => t.raw('plans') as PlanRaw[], [t]);
  const addons = useMemo(() => t.raw('addons') as AddonRaw[], [t]);
  const faqs = useMemo(() => t.raw('faq') as FaqRaw[], [t]);

  useEffect(() => {
    const stored = readStoredFormule();
    if (stored && plans.some((p) => p.id === stored)) {
      setSelectedPlanId(stored);
    }
  }, [plans]);

  const selectedPlanName = plans.find((p) => p.id === selectedPlanId)?.name ?? '';

  return (
    <section id="tarifs" className="relative z-10 w-full py-20 md:py-28 px-6 overflow-hidden">
      <div
        className="nebula-orb w-[600px] h-[600px] top-[5%] right-[-20%]"
        style={{ background: 'radial-gradient(circle, rgba(200,75,255,0.12) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 md:mb-20"
        >
          <span className="inline-block text-xs uppercase tracking-[0.2em] font-semibold text-text-muted mb-4">
            {t('eyebrow')}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text-white mb-4">
            {t('title')}{' '}
            <span className="font-ethno gradient-text tracking-wide">{t('titleAccent')}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-text-muted leading-relaxed">{t('intro')}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-20 md:mb-28 items-stretch">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'glass-card border-accent-primary/50 shadow-[0_0_50px_rgba(200,75,255,0.2)] lg:scale-[1.02] lg:-my-1'
                  : 'glass-card hover:border-white/20'
              } ${selectedPlanId === plan.id ? 'ring-2 ring-accent-primary/45' : ''}`}
            >
              {plan.highlighted && plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-white text-xs font-semibold shadow-[0_0_20px_rgba(200,75,255,0.45)]"
                    style={{ background: 'linear-gradient(135deg, #c84bff, #ff2d8f)' }}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-5">
                <h3 className="font-display text-2xl font-bold text-text-white mb-2">{plan.name}</h3>
                <p className="text-sm text-text-muted">{plan.tagline}</p>
              </div>

              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold font-ethno gradient-text tracking-tight">{plan.price}</span>
                  <span className="text-2xl font-semibold text-text-white">€</span>
                </div>
                <p className="text-xs text-text-muted mt-1">{plan.priceNote}</p>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-text-muted mb-4">
                <Lock className="w-3.5 h-3.5 shrink-0 text-accent-primary" />
                <span>{t('paymentLine')}</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setSelectedPlanId(plan.id);
                  writeStoredFormule(plan.id);
                }}
                className={`mb-4 w-full py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border ${
                  selectedPlanId === plan.id
                    ? 'bg-accent-primary/15 text-accent-primary border-accent-primary/45 shadow-[0_0_20px_rgba(200,75,255,0.15)]'
                    : 'bg-white/[0.04] text-text-muted border-white/10 hover:border-white/20 hover:text-text-white'
                }`}
              >
                {selectedPlanId === plan.id ? t('planSelectedCta') : t('selectPlanCta')}
              </button>

              <Link
                href={`/contact?${plan.ctaQuery}#devis`}
                onClick={() => writeStoredFormule(plan.id)}
                className={`group/cta flex items-center justify-center gap-2 w-full py-3 px-5 rounded-xl font-semibold text-sm transition-all mb-8 ${
                  plan.highlighted ? 'btn-primary' : 'btn-outline'
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-0.5" />
              </Link>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full mt-0.5 ${
                        plan.highlighted ? 'bg-accent-primary/20 text-accent-primary' : 'bg-white/10 text-text-white'
                      }`}
                    >
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-text-muted leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-white/10">
                <p className="text-xs uppercase tracking-wider font-semibold text-text-muted mb-3">
                  {plan.examples.length > 1 ? t('examplesMany') : t('examplesOne')}
                </p>
                <div className="space-y-2">
                  {plan.examples.map((ex) => (
                    <a
                      key={ex.href}
                      href={ex.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/ex flex items-start justify-between gap-3 p-3 -mx-3 rounded-xl hover:bg-white/5 transition-colors"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-white truncate">{ex.name}</p>
                        <p className="text-xs text-text-muted truncate">{ex.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 flex-shrink-0 text-text-muted transition-transform group-hover/ex:translate-x-1 group-hover/ex:text-accent-primary mt-0.5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 md:mb-28"
        >
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-center sm:gap-6 mb-4">
              <div className="flex-1 max-w-2xl mx-auto">
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-white mb-3">{t('addonsTitle')}</h3>
                <p className="text-text-muted">{t('addonsIntro')}</p>
              </div>
              {selectedPlanId ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPlanId(null);
                    writeStoredFormule(null);
                  }}
                  className="shrink-0 text-xs text-text-muted hover:text-text-white underline underline-offset-4 mt-2 sm:mt-10"
                >
                  {t('clearPlanSelection')}
                </button>
              ) : null}
            </div>
            {selectedPlanId ? (
              <p className="text-sm text-accent-primary/90 font-medium mb-6">{t('addonsLinkedHint', { plan: selectedPlanName })}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {addons.map((addon, i) => {
              const Icon = iconMap[addon.icon] ?? FileText;
              const addonHref = selectedPlanId
                ? `/contact?formule=${selectedPlanId}&option=${addon.slug}#devis`
                : `/contact?option=${addon.slug}#devis`;
              return (
                <motion.div key={addon.slug} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                  <Link
                    href={addonHref}
                    className="group flex flex-col h-full p-6 rounded-2xl glass-card hover:border-accent-primary/40 hover:shadow-[0_0_30px_rgba(200,75,255,0.12)] transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-accent-primary/15 text-accent-primary group-hover:bg-accent-primary/25 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-sm font-bold font-ethno text-text-white whitespace-nowrap">{addon.price}</span>
                    </div>
                    <h4 className="text-base font-semibold text-text-white mb-2">{addon.label}</h4>
                    <p className="text-sm text-text-muted leading-relaxed flex-grow mb-4">{addon.description}</p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-accent-primary">
                      <Plus className="w-3.5 h-3.5" />
                      <span>{t('addonCta')}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20 md:mb-28 max-w-3xl mx-auto"
        >
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-white mb-10 text-center">{t('faqTitle')}</h3>
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.q} className="glass-card overflow-hidden rounded-xl">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold text-text-white">{faq.q}</span>
                    <ChevronDown
                      className={`flex-shrink-0 w-5 h-5 text-text-muted transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-text-muted leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-10 sm:p-14 text-center overflow-hidden glass-card border-accent-primary/20"
        >
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-40"
            style={{ background: 'radial-gradient(circle, rgba(200,75,255,0.25) 0%, transparent 70%)' }}
          />
          <div className="relative">
            <h3 className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-4">{t('finalTitle')}</h3>
            <p className="text-text-muted text-lg mb-8 max-w-xl mx-auto">{t('finalSub')}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                href={selectedPlanId ? `/contact?formule=${selectedPlanId}#devis` : '/contact#devis'}
                onClick={() => selectedPlanId && writeStoredFormule(selectedPlanId)}
                className="group inline-flex items-center gap-2 btn-primary text-sm"
              >
                {t('finalCtaContact')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <WhatsAppCtaLink title={t('finalCtaWhatsapp')} subtitle={tc('whatsappAction')} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
