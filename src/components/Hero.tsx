'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const t = useTranslations('home');
  const tc = useTranslations('common');
  const locale = useLocale();
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
      {/* Background — brand photograph with editorial overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero.png"
          alt="The MORE Laser & Spa team in Ubud"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-[center_30%]"
        />
        {/* Editorial wash — deep teal at the bottom for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-deep/10 via-teal-deep/35 to-teal-deep/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-deep/45 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 h-full container-edge flex flex-col justify-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-sans text-[11px] md:text-xs uppercase tracking-ultra text-gold"
        >
          Ubud · Bali · est. 2020
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-4xl text-cream"
        >
          {t('tagline')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-6 max-w-xl text-cream/85 font-serif italic text-lg md:text-xl"
        >
          {t('subtag')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link href={`${prefix}/booking`} className="btn-gold">
            {tc('bookNow')}
          </Link>
          <Link href={`${prefix}/services`} className="btn-outline !border-cream/40 !text-cream hover:!bg-cream hover:!text-teal-deep">
            {tc('viewPricing')}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-cream"
      >
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}
