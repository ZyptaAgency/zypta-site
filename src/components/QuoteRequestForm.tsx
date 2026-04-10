'use client';

import { Suspense, useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Calculator, CheckCircle, Sparkles, Link2 } from 'lucide-react';
import { readStoredFormule, writeStoredFormule } from '@/lib/pricing-prefs';
import { validatePhoneFull } from '@/lib/phone-countries';
import PhoneField from '@/components/PhoneField';

const inputStyles =
  'w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-text-white text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-accent-primary/50 focus:shadow-[0_0_20px_rgba(200,75,255,0.15)] transition-all duration-300';

type PlanRaw = {
  id: string;
  name: string;
  price: string;
  priceNote: string;
};

type AddonRaw = {
  label: string;
  price: string;
  description: string;
  slug: string;
};

type QuoteFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  planId: string;
  addonSlugs: string[];
  notes: string;
};

function reqTrim(msg: string) {
  return {
    required: msg,
    validate: (v: string) => (v || '').trim().length > 0 || msg,
  };
}

function parsePlanPriceEuros(price: string): number {
  const digits = price.replace(/\s/g, '').replace(/[^\d]/g, '');
  return parseInt(digits, 10) || 0;
}

/** Extract main euro amount from strings like "+ 290 €", "€49/mo", "+ €390" */
function parseAddonEuros(price: string): { oneTime: number; isMonthly: boolean } {
  const lower = price.toLowerCase();
  const isMonthly = lower.includes('/mo') || lower.includes('mois');
  const digits = price.replace(/\s/g, '').replace(/[^\d]/g, '');
  const n = parseInt(digits, 10) || 0;
  return { oneTime: n, isMonthly };
}

function QuoteRequestFormInner() {
  const t = useTranslations('contact');
  const tp = useTranslations('pricing');
  const searchParams = useSearchParams();
  const urlApplied = useRef(false);

  const plans = tp.raw('plans') as PlanRaw[];
  const addons = tp.raw('addons') as AddonRaw[];

  const planIds = useMemo(() => new Set(plans.map((p) => p.id)), [plans]);
  const addonSlugs = useMemo(() => new Set(addons.map((a) => a.slug)), [addons]);

  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<QuoteFormValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      planId: '',
      addonSlugs: [],
      notes: '',
    },
  });

  const planId = watch('planId');
  const addonSlugsValue = watch('addonSlugs');

  const planField = register('planId', { required: true });

  useEffect(() => {
    if (urlApplied.current) return;
    urlApplied.current = true;

    const f = searchParams.get('formule')?.toLowerCase();
    const fromUrl = f && planIds.has(f) ? f : null;

    if (fromUrl) {
      setValue('planId', fromUrl);
      writeStoredFormule(fromUrl);
    } else {
      const stored = readStoredFormule();
      if (stored && planIds.has(stored)) {
        setValue('planId', stored);
      }
    }

    const opts = searchParams.getAll('option').filter((s) => addonSlugs.has(s));
    if (opts.length) {
      setValue('addonSlugs', Array.from(new Set(opts)));
    }
  }, [searchParams, planIds, addonSlugs, setValue]);

  const estimate = useMemo(() => {
    const selectedAddonSlugs = Array.isArray(addonSlugsValue) ? addonSlugsValue : [];
    const plan = plans.find((p) => p.id === planId);
    const base = plan ? parsePlanPriceEuros(plan.price) : 0;
    let extras = 0;
    let monthly: { label: string; amount: number } | null = null;

    for (const slug of selectedAddonSlugs) {
      const ad = addons.find((a) => a.slug === slug);
      if (!ad) continue;
      const { oneTime, isMonthly } = parseAddonEuros(ad.price);
      if (isMonthly) {
        monthly = { label: ad.label, amount: oneTime };
      } else {
        extras += oneTime;
      }
    }

    return { base, extras, monthly, totalOneTime: base + extras };
  }, [planId, addonSlugsValue, plans, addons]);

  const onSubmit = async (data: QuoteFormValues) => {
    setSending(true);
    setError(null);
    const plan = plans.find((p) => p.id === data.planId);
    const picked = addons.filter((a) => data.addonSlugs?.includes(a.slug));
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'quote',
          firstName: data.firstName.trim(),
          lastName: data.lastName.trim(),
          email: data.email,
          phone: data.phone || '',
          planId: data.planId,
          planName: plan?.name || data.planId,
          planPrice: plan?.price || '',
          planPriceNote: plan?.priceNote || '',
          addons: picked.map((a) => ({ slug: a.slug, label: a.label, price: a.price })),
          notes: data.notes || '',
          estimateOneTime: estimate.totalOneTime,
          estimateMonthly: estimate.monthly,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError((json.details as string) || (json.error as string) || 'Erreur');
        setSending(false);
        return;
      }
    } catch {
      setError('Erreur de connexion');
      setSending(false);
      return;
    }
    setSending(false);
    setSent(true);
    writeStoredFormule(null);
    reset();
    setTimeout(() => setSent(false), 10000);
  };

  const copyQuoteLink = () => {
    const params = new URLSearchParams();
    if (planId) params.set('formule', planId);
    const slugs = Array.isArray(addonSlugsValue) ? addonSlugsValue : [];
    for (const s of slugs) params.append('option', s);
    const qs = params.toString();
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}${path}${qs ? `?${qs}` : ''}#devis`;
    void navigator.clipboard.writeText(url).then(() => {
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 2200);
    });
  };

  return (
    <div id="devis" className="glass-card p-8 scroll-mt-28">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-accent-primary/15 flex items-center justify-center">
          <Calculator size={18} className="text-accent-primary" />
        </div>
        <h2 className="font-display text-xl font-semibold text-text-white">{t('quoteTitle')}</h2>
      </div>
      <p className="text-text-muted text-sm mb-6">{t('quoteSub')}</p>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-10 px-4 rounded-xl border border-accent-primary/20 bg-accent-primary/5"
          >
            <CheckCircle className="w-14 h-14 text-accent-primary mx-auto mb-4" />
            <h3 className="font-display text-lg font-bold text-text-white mb-2">{t('quoteSuccessTitle')}</h3>
            <p className="text-text-muted text-sm max-w-md mx-auto">{t('quoteSuccessSub')}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >
            <div>
              <label htmlFor="quote-plan" className="block text-text-muted text-xs mb-2 font-medium">
                {t('quotePlanLabel')} <span className="text-nova-outer">*</span>
              </label>
              <select
                id="quote-plan"
                name={planField.name}
                ref={planField.ref}
                onBlur={planField.onBlur}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  planField.onChange(e);
                  writeStoredFormule(e.target.value || null);
                }}
                className={`${inputStyles} form-select-dark cursor-pointer appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-12`}
                style={{
                  backgroundColor: '#120a1c',
                  color: 'var(--text-white)',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' stroke='rgba(240,238,255,0.45)' stroke-width='2'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E")`,
                }}
              >
                <option value="">{t('quotePlanEmpty')}</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.price} € ({p.priceNote})
                  </option>
                ))}
              </select>
              {errors.planId && <p className="text-nova-outer text-xs mt-1">{t('quotePlanRequired')}</p>}
            </div>

            <div>
              <p className="text-text-muted text-xs mb-3 font-medium">{t('quoteAddonsLabel')}</p>
              <div className="space-y-2.5">
                {addons.map((addon) => (
                  <label
                    key={addon.slug}
                    className="flex items-start gap-3 p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-accent-primary/30 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={addon.slug}
                      {...register('addonSlugs')}
                      className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-accent-primary focus:ring-accent-primary/40"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-sm font-medium text-text-white">{addon.label}</span>
                        <span className="text-xs font-ethno text-accent-primary shrink-0">{addon.price}</span>
                      </span>
                      <span className="text-xs text-text-muted block mt-0.5 leading-relaxed">{addon.description}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {(planId || (Array.isArray(addonSlugsValue) && addonSlugsValue.length > 0)) ? (
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={copyQuoteLink}
                  className="inline-flex items-center gap-2 text-xs font-medium text-accent-primary hover:text-text-white transition-colors"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  {linkCopied ? t('quoteCopied') : t('quoteCopyLink')}
                </button>
              </div>
            ) : null}

            {planId ? (
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                  <Sparkles className="w-3.5 h-3.5 text-accent-primary" />
                  {t('quoteEstimate')}
                </div>
                <p className="text-lg font-ethno font-bold gradient-text">
                  {estimate.totalOneTime.toLocaleString()} € <span className="text-sm font-sans font-normal text-text-muted">TVAC</span>
                </p>
                {estimate.monthly ? (
                  <p className="text-xs text-text-muted">
                    + {estimate.monthly.amount} €{t('quotePerMonth')} — {estimate.monthly.label}
                  </p>
                ) : null}
                <p className="text-[11px] text-text-muted leading-relaxed">{t('quoteEstimateHint')}</p>
              </div>
            ) : null}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="quote-firstName" className="block text-text-muted text-xs mb-2 font-medium">
                  {t('firstName')} <span className="text-nova-outer">*</span>
                </label>
                <input
                  id="quote-firstName"
                  {...register('firstName', reqTrim(t('fieldRequired')))}
                  autoComplete="given-name"
                  className={inputStyles}
                  aria-required="true"
                />
                {errors.firstName && <p className="text-nova-outer text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label htmlFor="quote-lastName" className="block text-text-muted text-xs mb-2 font-medium">
                  {t('lastName')} <span className="text-nova-outer">*</span>
                </label>
                <input
                  id="quote-lastName"
                  {...register('lastName', reqTrim(t('fieldRequired')))}
                  autoComplete="family-name"
                  className={inputStyles}
                  aria-required="true"
                />
                {errors.lastName && <p className="text-nova-outer text-xs mt-1">{errors.lastName.message}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="quote-email" className="block text-text-muted text-xs mb-2 font-medium">
                {t('email')} <span className="text-nova-outer">*</span>
              </label>
              <input
                id="quote-email"
                {...register('email', {
                  required: t('fieldRequired'),
                  pattern: { value: /^\S+@\S+$/i, message: t('invalidEmail') },
                })}
                type="email"
                autoComplete="email"
                className={inputStyles}
                aria-required="true"
              />
              {errors.email && <p className="text-nova-outer text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="quote-phone" className="block text-text-muted text-xs mb-2 font-medium">
                {t('quotePhone')} <span className="text-nova-outer">*</span>
              </label>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: t('phoneRequired'),
                  validate: (v) => validatePhoneFull(v || '') || t('phoneInvalid'),
                }}
                render={({ field }) => (
                  <PhoneField
                    id="quote-phone"
                    value={field.value || ''}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    disabled={sending}
                    hasError={!!errors.phone}
                  />
                )}
              />
              {errors.phone && (
                <p className="text-nova-outer text-xs mt-1">{String(errors.phone.message)}</p>
              )}
            </div>
            <div>
              <textarea
                {...register('notes')}
                placeholder={t('quoteNotesPlaceholder')}
                rows={3}
                className={`${inputStyles} resize-none`}
              />
            </div>

            {error && <p className="text-nova-outer text-sm">{error}</p>}
            <button type="submit" disabled={sending} className="btn-primary w-full text-base disabled:opacity-60 inline-flex items-center justify-center gap-2">
              <FileText className="w-4 h-4" />
              {sending ? t('sending') : t('quoteSubmit')}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function QuoteFallback() {
  const t = useTranslations('contact');
  return (
    <div id="devis" className="glass-card p-8 min-h-[320px] animate-pulse scroll-mt-28">
      <div className="h-6 w-48 bg-white/10 rounded mb-4" />
      <div className="h-4 w-full max-w-md bg-white/5 rounded mb-8" />
      <div className="h-12 w-full bg-white/5 rounded mb-4" />
      <div className="h-24 w-full bg-white/5 rounded" />
      <span className="sr-only">{t('quoteTitle')}</span>
    </div>
  );
}

export default function QuoteRequestForm() {
  return (
    <Suspense fallback={<QuoteFallback />}>
      <QuoteRequestFormInner />
    </Suspense>
  );
}
