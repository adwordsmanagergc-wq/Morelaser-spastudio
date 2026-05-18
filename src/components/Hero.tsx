'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import Logo from './Logo';

export default function Hero() {
  const t = useTranslations('home');
  const tc = useTranslations('common');
  const locale = useLocale();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden pt-24 md:pt-28">
      {/* Ocean-splash backdrop */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-seafoam via-[#c8e3e5] to-[#e6f1f0]" />
        {/* Soft organic "splash" blobs */}
        <div
          aria-hidden
          className="absolute -top-32 -left-24 w-[55vw] h-[55vw] rounded-full bg-teal-200/40 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute top-1/3 -right-32 w-[40vw] h-[40vw] rounded-full bg-teal-300/30 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-40 left-1/3 w-[50vw] h-[50vw] rounded-full bg-cream/60 blur-3xl"
        />
        {/* Subtle grain */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #1a5f6f 1px, transparent 0)',
            backgroundSize: '4px 4px'
          }}
        />
      </div>

      <div className="container-edge grid lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[calc(100svh-6rem)] py-12 md:py-16">
        {/* Left — copy block */}
        <div className="lg:col-span-6 xl:col-span-7 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8 md:mb-10"
          >
            <Logo size="lg" />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="font-sans text-[11px] md:text-xs uppercase tracking-ultra text-gold"
          >
            Ubud · Bali · est. 2020
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-2xl text-teal-deep"
          >
            {t('tagline')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-6 max-w-xl text-teal-deep/75 font-serif italic text-lg md:text-xl"
          >
            {t('subtag')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href={`${prefix}/booking`} className="btn-primary">
              {tc('bookNow')}
            </Link>
            <Link href={`${prefix}/services`} className="btn-outline">
              {tc('viewPricing')}
            </Link>
          </motion.div>
        </div>

        {/* Right — framed team photograph */}
        <div className="lg:col-span-6 xl:col-span-5 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md lg:max-w-lg mx-auto"
          >
            {/* Decorative gold frame offset */}
            <div
              aria-hidden
              className="absolute -inset-3 md:-inset-4 border border-gold/60 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6"
            />
            <div className="relative aspect-[928/1152] overflow-hidden bg-cream shadow-2xl">
              <Image
                src="/hero.png"
                alt="The MORE Laser & Spa team in Ubud"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                quality={90}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/10 to-transparent" />
            </div>
            {/* Caption mark */}
            <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-gold text-teal-deep px-5 py-3 shadow-lg">
              <p className="font-serif italic text-sm md:text-base leading-none">
                Welcome to MORE
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, y: [0, 8, 0] }}
        transition={{ delay: 1.4, duration: 2.4, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-teal-deep"
      >
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
