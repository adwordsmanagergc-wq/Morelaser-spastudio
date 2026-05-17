'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { MessageCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StickyBookCTA() {
  const t = useTranslations('common');
  const locale = useLocale();
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '6281234567890';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.5 }}
      className="fixed bottom-5 right-5 z-40 flex flex-col gap-3 md:hidden"
    >
      <a
        href={`https://wa.me/${wa}`}
        aria-label={t('whatsapp')}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-gold text-teal-deep shadow-xl hover:scale-105 transition-transform"
      >
        <MessageCircle size={22} />
      </a>
      <Link
        href={`${prefix}/booking`}
        aria-label={t('bookNow')}
        className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-deep text-cream shadow-xl hover:scale-105 transition-transform"
      >
        <Calendar size={22} />
      </Link>
    </motion.div>
  );
}
