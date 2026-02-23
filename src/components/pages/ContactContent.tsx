'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Instagram, Eye, Send } from 'lucide-react';
import AnimatedSection from '../AnimatedSection';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface PreviewFormData {
  name: string;
  email: string;
  phone: string;
  business: string;
  service: string;
  details: string;
}

const inputStyles =
  'w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-text-white text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-accent-primary/50 focus:shadow-[0_0_20px_rgba(200,75,255,0.15)] transition-all duration-300';

function ContactForm() {
  const t = useTranslations('contact');
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const onSubmit = () => {
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-accent-primary/15 flex items-center justify-center">
          <Send size={18} className="text-accent-primary" />
        </div>
        <h3 className="font-display text-xl font-semibold text-text-white">
          {t('headline')}
        </h3>
      </div>
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <div className="text-5xl mb-4">🚀</div>
            <p className="text-text-white text-lg font-semibold">{t('success')}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <input {...register('name', { required: true })} placeholder={t('name')} className={inputStyles} />
              {errors.name && <p className="text-nova-outer text-xs mt-1">Required</p>}
            </div>
            <div>
              <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder={t('email')} className={inputStyles} />
              {errors.email && <p className="text-nova-outer text-xs mt-1">Required</p>}
            </div>
            <div>
              <input {...register('subject', { required: true })} placeholder={t('subject')} className={inputStyles} />
              {errors.subject && <p className="text-nova-outer text-xs mt-1">Required</p>}
            </div>
            <div>
              <textarea {...register('message', { required: true })} placeholder={t('message')} rows={4} className={`${inputStyles} resize-none`} />
              {errors.message && <p className="text-nova-outer text-xs mt-1">Required</p>}
            </div>
            <button type="submit" className="btn-primary w-full text-base">
              {t('submit')}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function PreviewForm() {
  const t = useTranslations('preview');
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PreviewFormData>();

  const onSubmit = () => {
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 6000);
  };

  const serviceKeys = ['showcase', 'ecommerce', 'seo', 'branding', 'other'] as const;

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-nova-core/5 to-nova-ice/10" />
      <div className="absolute inset-0 border border-accent-primary/25 rounded-2xl" />
      <div className="relative p-8" style={{ background: 'rgba(3,1,10,0.7)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-nova-core/15 flex items-center justify-center">
            <Eye size={18} className="text-nova-core" />
          </div>
          <h3 className="font-display text-xl font-semibold gradient-text">
            {t('title')}
          </h3>
        </div>
        <p className="text-text-muted text-sm mb-6">{t('sub')}</p>

        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-12"
            >
              <div className="text-5xl mb-4">🎨</div>
              <p className="text-text-white text-lg font-semibold">{t('success')}</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input {...register('name', { required: true })} placeholder={t('name')} className={inputStyles} />
                  {errors.name && <p className="text-nova-outer text-xs mt-1">Required</p>}
                </div>
                <div>
                  <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} type="email" placeholder={t('email')} className={inputStyles} />
                  {errors.email && <p className="text-nova-outer text-xs mt-1">Required</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input {...register('phone')} type="tel" placeholder={t('phone')} className={inputStyles} />
                </div>
                <div>
                  <input {...register('business', { required: true })} placeholder={t('businessPlaceholder')} className={inputStyles} />
                  {errors.business && <p className="text-nova-outer text-xs mt-1">Required</p>}
                </div>
              </div>
              <div>
                <label className="block text-text-muted text-xs mb-2 font-medium">{t('serviceLabel')}</label>
                <div className="flex flex-wrap gap-2">
                  {serviceKeys.map((key) => (
                    <label key={key} className="relative cursor-pointer">
                      <input
                        type="radio"
                        value={key}
                        {...register('service', { required: true })}
                        className="peer sr-only"
                      />
                      <span className="block px-4 py-2 rounded-full text-xs font-medium border border-white/10 text-text-muted bg-white/[0.03] transition-all peer-checked:border-accent-primary peer-checked:text-text-white peer-checked:bg-accent-primary/15 peer-checked:shadow-[0_0_15px_rgba(200,75,255,0.2)] hover:border-white/20">
                        {t(`serviceOptions.${key}`)}
                      </span>
                    </label>
                  ))}
                </div>
                {errors.service && <p className="text-nova-outer text-xs mt-1">Required</p>}
              </div>
              <div>
                <textarea {...register('details')} placeholder={t('detailsPlaceholder')} rows={3} className={`${inputStyles} resize-none`} />
              </div>
              <button type="submit" className="btn-primary w-full text-base">
                {t('submit')}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function QuickContactCards() {
  const t = useTranslations('contact');

  return (
    <div className="space-y-4">
      <p className="text-center text-text-muted text-sm">{t('quickResponse')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Instagram CTA */}
        <motion.a
          href="https://instagram.com/zypta.be"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="group relative block overflow-hidden rounded-2xl cursor-pointer"
        >
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)',
              opacity: 0.9,
            }}
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, #feda75 0%, #fa7e1e 15%, #d62976 35%, #962fbf 55%, #4f5bd5 100%)',
            }}
          />
          <div className="relative px-6 py-7 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <Instagram size={32} className="text-white" />
            </div>
            <div>
              <p className="text-white font-display font-bold text-base mb-0.5">{t('instaCta')}</p>
              <p className="text-white/80 text-sm font-semibold">{t('instagram')}</p>
            </div>
            <div className="flex items-center gap-1.5 text-white/70 text-xs mt-1 group-hover:text-white transition-colors">
              <span>{t('instaAction')}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </motion.a>

        {/* Gmail CTA */}
        <motion.a
          href="mailto:contact@zypta.be"
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="group relative block overflow-hidden rounded-2xl cursor-pointer"
        >
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(160deg, #EA4335 0%, #D93025 40%, #C5221F 70%, #B31412 100%)',
              opacity: 0.9,
            }}
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(160deg, #EA4335 0%, #D93025 50%, #C5221F 100%)',
            }}
          />
          {/* Subtle colored accents like the Gmail M logo corners */}
          <div className="absolute top-0 left-0 w-16 h-16 opacity-30" style={{ background: 'radial-gradient(circle at top left, #4285F4, transparent 70%)' }} />
          <div className="absolute bottom-0 left-0 w-16 h-16 opacity-25" style={{ background: 'radial-gradient(circle at bottom left, #FBBC04, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-16 h-16 opacity-25" style={{ background: 'radial-gradient(circle at bottom right, #34A853, transparent 70%)' }} />
          <div className="relative px-6 py-7 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <Mail size={32} className="text-white" />
            </div>
            <div>
              <p className="text-white font-display font-bold text-base mb-0.5">{t('emailCta')}</p>
              <p className="text-white/80 text-sm font-semibold">{t('emailAddress')}</p>
            </div>
            <div className="flex items-center gap-1.5 text-white/70 text-xs mt-1 group-hover:text-white transition-colors">
              <span>{t('emailAction')}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </motion.a>
      </div>
    </div>
  );
}

export default function ContactContent() {
  const t = useTranslations('contact');

  return (
    <div className="relative z-10 pt-32 pb-24 px-6">
      <div
        className="nebula-orb w-[500px] h-[500px] top-[10%] right-[-10%]"
        style={{ background: 'radial-gradient(circle, rgba(255,45,143,0.15) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-6xl font-bold gradient-text mb-4">
            {t('headline')}
          </h1>
          <p className="text-text-muted text-lg">
            {t('sub')}
          </p>
        </AnimatedSection>

        {/* Preview Form - prominent */}
        <AnimatedSection className="mb-12">
          <PreviewForm />
        </AnimatedSection>

        {/* Quick Contact: Instagram + Gmail */}
        <AnimatedSection delay={0.1} className="mb-12">
          <QuickContactCards />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <AnimatedSection className="lg:col-span-3">
            <ContactForm />
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection delay={0.2} className="lg:col-span-2">
            <div className="glass-card p-8 space-y-6">
              <h3 className="font-display text-xl font-semibold text-text-white mb-4">
                {t('infoTitle')}
              </h3>
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <Phone size={18} className="text-accent-primary shrink-0" />
                <span>{t('phone')}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <Mail size={18} className="text-accent-primary shrink-0" />
                <span>{t('emailAddress')}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <MapPin size={18} className="text-accent-primary shrink-0" />
                <span>{t('address')}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-text-muted">
                <Clock size={18} className="text-accent-primary shrink-0" />
                <span>{t('hours')}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
