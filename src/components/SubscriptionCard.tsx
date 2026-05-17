'use client';

import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { formatIDR } from '@/lib/cn';

interface SubItem {
  id: string;
  name: { en: string; ru: string };
  tiers: { visits: number; price: number }[];
}

export default function SubscriptionCard({ items }: { items: SubItem[] }) {
  const locale = useLocale() as 'en' | 'ru';
  const tc = useTranslations('common');

  return (
    <div className="space-y-6">
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.08 }}
          className="border border-teal-deep/15 bg-cream/60 p-8 md:p-10"
        >
          <h4 className="font-serif text-2xl md:text-3xl text-teal-deep mb-6">
            {item.name[locale]}
          </h4>
          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {item.tiers.map((tier, i) => (
              <div
                key={tier.visits}
                className={
                  i === item.tiers.length - 1
                    ? 'bg-teal-deep text-cream p-5 md:p-6 text-center'
                    : 'border border-teal-deep/15 p-5 md:p-6 text-center text-teal-deep'
                }
              >
                <div
                  className={`font-sans text-[10px] md:text-xs uppercase tracking-widest mb-2 ${
                    i === item.tiers.length - 1 ? 'text-gold' : 'text-teal-deep/60'
                  }`}
                >
                  {tier.visits} {tc('visits')}
                </div>
                <div className="font-serif text-xl md:text-2xl tabular-nums">
                  {formatIDR(tier.price)}
                </div>
                <div
                  className={`mt-1 text-[10px] uppercase tracking-widest ${
                    i === item.tiers.length - 1 ? 'text-cream/60' : 'text-teal-deep/50'
                  }`}
                >
                  {tc('perVisit')}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
