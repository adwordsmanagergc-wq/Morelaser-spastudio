'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import prices from '../../data/prices.json';

type Step = 1 | 2 | 3;
type FormState = {
  name: string;
  email: string;
  phone: string;
  isWhatsapp: boolean;
  service: string;
  date: string;
  time: string;
  notes: string;
  returning: boolean;
};

const initial: FormState = {
  name: '',
  email: '',
  phone: '',
  isWhatsapp: true,
  service: '',
  date: '',
  time: '',
  notes: '',
  returning: false
};

export default function BookingForm() {
  const t = useTranslations('booking');
  const locale = useLocale() as 'en' | 'ru';
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const serviceOptions = [
    ...prices.packages.items,
    ...prices.upperBody.items,
    ...prices.lowerBody.items,
    ...prices.endosphere.items,
    ...prices.facial.items
  ].map((p) => ({
    id: p.id,
    label: typeof p.name === 'string' ? p.name : p.name[locale]
  }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Request failed');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="border border-gold/40 bg-cream p-12 text-center"
      >
        <Check className="mx-auto text-gold mb-6" size={48} strokeWidth={1} />
        <h3 className="font-serif text-3xl text-teal-deep mb-4">Merci.</h3>
        <p className="text-teal-deep/70">{t('success')}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-cream/60 border border-teal-deep/15 p-8 md:p-12">
      <div className="flex items-center justify-between mb-10">
        <span className="font-sans text-xs uppercase tracking-widest text-gold">
          {t('step')} {step} {t('of')} 3
        </span>
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <span
              key={s}
              className={`h-px transition-all duration-500 ${
                s <= step ? 'bg-gold w-10' : 'bg-teal-deep/20 w-6'
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <label className="label">{t('fields.name')}</label>
              <input
                className="input"
                required
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">{t('fields.email')}</label>
                <input
                  className="input"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                />
              </div>
              <div>
                <label className="label">{t('fields.phone')}</label>
                <input
                  className="input"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                />
              </div>
            </div>
            <label className="inline-flex items-center gap-3 text-sm text-teal-deep/80">
              <input
                type="checkbox"
                checked={form.isWhatsapp}
                onChange={(e) => update('isWhatsapp', e.target.checked)}
                className="accent-gold w-4 h-4"
              />
              {t('fields.phoneWa')}
            </label>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <label className="label">{t('fields.service')}</label>
              <select
                className="input"
                required
                value={form.service}
                onChange={(e) => update('service', e.target.value)}
              >
                <option value="">{t('fields.selectService')}</option>
                {serviceOptions.map((s) => (
                  <option key={s.id} value={s.label}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="label">{t('fields.date')}</label>
                <input
                  className="input"
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) => update('date', e.target.value)}
                />
              </div>
              <div>
                <label className="label">{t('fields.time')}</label>
                <input
                  className="input"
                  type="time"
                  required
                  value={form.time}
                  onChange={(e) => update('time', e.target.value)}
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div>
              <label className="label">{t('fields.notes')}</label>
              <textarea
                className="input min-h-[140px] resize-none"
                value={form.notes}
                onChange={(e) => update('notes', e.target.value)}
              />
            </div>
            <label className="inline-flex items-center gap-3 text-sm text-teal-deep/80">
              <input
                type="checkbox"
                checked={form.returning}
                onChange={(e) => update('returning', e.target.checked)}
                className="accent-gold w-4 h-4"
              />
              {t('fields.returning')}
            </label>
            {status === 'error' && (
              <p className="text-red-600 text-sm">{t('error')}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-10 flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={() => setStep((s) => (s - 1) as Step)}
            className="btn-outline"
          >
            <ArrowLeft size={14} /> {t('back')}
          </button>
        ) : (
          <span />
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep((s) => (s + 1) as Step)}
            className="btn-primary"
          >
            {t('next')} <ArrowRight size={14} />
          </button>
        ) : (
          <button type="submit" disabled={status === 'sending'} className="btn-gold">
            {status === 'sending' ? t('submitting') : t('submit')}
          </button>
        )}
      </div>
    </form>
  );
}
