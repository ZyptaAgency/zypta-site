'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Eye, Send, CheckCircle, Sparkles } from 'lucide-react';
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
  servicesOffered: string;
  photo?: FileList;
  logo?: FileList;
}

const inputStyles =
  'w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-3.5 text-text-white text-sm placeholder:text-text-muted/60 focus:outline-none focus:border-accent-primary/50 focus:shadow-[0_0_20px_rgba(200,75,255,0.15)] transition-all duration-300';

function SuccessBanner({ title, subtitle, icon }: { title: string; subtitle: string; icon: 'contact' | 'preview' }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      className="relative text-center py-14 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-nova-core/5 to-nova-ice/10 rounded-2xl" />
      <div className="absolute inset-0 border border-accent-primary/20 rounded-2xl" />

      <motion.div
        className="absolute top-4 left-6 text-accent-primary/40"
        animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      >
        <Sparkles size={20} />
      </motion.div>
      <motion.div
        className="absolute top-8 right-8 text-nova-core/40"
        animate={{ rotate: [0, -15, 15, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.5 }}
      >
        <Sparkles size={16} />
      </motion.div>
      <motion.div
        className="absolute bottom-6 left-1/4 text-nova-ice/30"
        animate={{ rotate: [0, 20, -10, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.8 }}
      >
        <Sparkles size={14} />
      </motion.div>

      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 10, delay: 0.2 }}
          className="mx-auto mb-5 w-20 h-20 rounded-full flex items-center justify-center"
          style={{
            background: icon === 'preview'
              ? 'linear-gradient(135deg, rgba(200,75,255,0.25), rgba(98,40,215,0.25))'
              : 'linear-gradient(135deg, rgba(200,75,255,0.25), rgba(255,45,143,0.25))',
            boxShadow: icon === 'preview'
              ? '0 0 40px rgba(200,75,255,0.3), 0 0 80px rgba(98,40,215,0.15)'
              : '0 0 40px rgba(200,75,255,0.3), 0 0 80px rgba(255,45,143,0.15)',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <CheckCircle size={40} className="text-accent-primary" />
          </motion.div>
        </motion.div>

        <motion.h4
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="font-display text-xl font-bold text-text-white mb-2"
        >
          {title}
        </motion.h4>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-text-muted text-sm max-w-xs mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.div>
  );
}

function ContactForm() {
  const t = useTranslations('contact');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>();

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    setSending(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'contact', ...data }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.details || json.error || 'Erreur lors de l\'envoi');
        setSending(false);
        return;
      }
    } catch (e) {
      setError('Erreur de connexion');
      setSending(false);
      return;
    }
    setSending(false);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 8000);
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
          <SuccessBanner
            title={t('successTitle')}
            subtitle={t('successSub')}
            icon="contact"
          />
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
            {error && <p className="text-nova-outer text-sm">{error}</p>}
            <button type="submit" disabled={sending} className="btn-primary w-full text-base disabled:opacity-60">
              {sending ? t('sending') : t('submit')}
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
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PreviewFormData>();

  const onSubmit = async (data: PreviewFormData, e?: React.BaseSyntheticEvent) => {
    setSending(true);
    setError(null);
    try {
      const form = e?.target as HTMLFormElement;
      const formData = form ? new FormData(form) : new FormData();
      formData.set('type', 'preview');

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.details || json.error || 'Erreur lors de l\'envoi');
        setSending(false);
        return;
      }
    } catch (err) {
      setError('Erreur de connexion');
      setSending(false);
      return;
    }
    setSending(false);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 10000);
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
            <SuccessBanner
              title={t('successTitle')}
              subtitle={t('successSub')}
              icon="preview"
            />
          ) : (
            <motion.form
              key="form"
              encType="multipart/form-data"
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
              <div>
                <label className="block text-text-muted text-xs mb-2 font-medium">{t('servicesOfferedLabel')}</label>
                <textarea {...register('servicesOffered')} placeholder={t('servicesOfferedPlaceholder')} rows={3} className={`${inputStyles} resize-none`} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-muted text-xs mb-2 font-medium">{t('photoLabel')}</label>
                  <input {...register('photo')} type="file" accept="image/*" className={`${inputStyles} file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent-primary/20 file:text-accent-primary hover:file:bg-accent-primary/30 file:cursor-pointer`} />
                </div>
                <div>
                  <label className="block text-text-muted text-xs mb-2 font-medium">{t('logoLabel')}</label>
                  <input {...register('logo')} type="file" accept="image/*,.svg" className={`${inputStyles} file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent-primary/20 file:text-accent-primary hover:file:bg-accent-primary/30 file:cursor-pointer`} />
                </div>
              </div>
              {error && <p className="text-nova-outer text-sm">{error}</p>}
              <button type="submit" disabled={sending} className="btn-primary w-full text-base disabled:opacity-60">
                {sending ? t('sending') : t('submit')}
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* WhatsApp CTA */}
        <motion.a
          href="https://wa.me/32487102928?text=Bonjour%20Zypta%20!%20Je%20suis%20int%C3%A9ress%C3%A9(e)%20par%20vos%20services."
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, y: -3 }}
          whileTap={{ scale: 0.98 }}
          className="group relative block overflow-hidden rounded-2xl cursor-pointer"
        >
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, #25D366 0%, #128C7E 50%, #075E54 100%)',
              opacity: 0.9,
            }}
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, #34E879 0%, #25D366 40%, #128C7E 100%)',
            }}
          />
          <div className="relative px-6 py-7 flex flex-col items-center text-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div>
              <p className="text-white font-display font-bold text-base mb-0.5">{t('whatsappCta')}</p>
              <p className="text-white/80 text-sm font-semibold">{t('phone')}</p>
            </div>
            <div className="flex items-center gap-1.5 text-white/70 text-xs mt-1 group-hover:text-white transition-colors">
              <span>{t('whatsappAction')}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
        </motion.a>

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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
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
            <div className="w-16 h-16 rounded-2xl bg-white backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
              <svg width="32" height="24" viewBox="0 0 256 193">
                <path fill="#4285F4" d="M58.182 192.05V93.14L27.507 65.077 0 49.504v125.091c0 9.658 7.825 17.455 17.455 17.455h40.727Z"/>
                <path fill="#34A853" d="M197.818 192.05h40.727c9.659 0 17.455-7.826 17.455-17.455V49.505l-31.156 17.837-27.026 25.798v98.91Z"/>
                <path fill="#EA4335" d="m58.182 93.14-4.174-38.647 4.174-36.989L128 69.868l69.818-52.364 4.67 34.992-4.67 40.644L128 145.504z"/>
                <path fill="#FBBC04" d="M197.818 17.504V93.14L256 49.504V26.231c0-21.585-24.64-33.89-41.89-20.945l-16.292 12.218Z"/>
                <path fill="#C5221F" d="m0 49.504 26.759 20.07L58.182 93.14V17.504L41.89 5.286C24.61-7.66 0 4.646 0 26.23v23.273Z"/>
              </svg>
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
