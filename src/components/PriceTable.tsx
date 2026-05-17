'use client';

import { useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { formatIDR } from '@/lib/cn';

export interface PriceItem {
  id: string;
  name: { en: string; ru: string } | string;
  price: number;
  wasPrice?: number;
}

export default function PriceTable({
  title,
  items,
  caption
}: {
  title?: string;
  items: PriceItem[];
  caption?: string;
}) {
  const locale = useLocale() as 'en' | 'ru';

  return (
    <div className="w-full">
      {title && (
        <h3 className="font-serif text-3xl md:text-4xl text-teal-deep mb-2">{title}</h3>
      )}
      {caption && <p className="text-teal-deep/60 italic font-serif mb-8">{caption}</p>}

      <ul className="divide-y divide-teal-deep/10">
        {items.map((item, i) => {
          const name = typeof item.name === 'string' ? item.name : item.name[locale];
          const hasDiscount = item.wasPrice && item.wasPrice > item.price;
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-baseline justify-between gap-4 py-5"
            >
              <span className="font-serif text-base md:text-lg text-teal-deep flex-1">
                {name}
              </span>
              <span className="flex-shrink-0 flex items-baseline gap-3">
                {hasDiscount && (
                  <span className="text-teal-deep/40 line-through text-sm">
                    {formatIDR(item.wasPrice!)}
                  </span>
                )}
                <span className="font-sans text-base md:text-lg text-teal-deep tabular-nums">
                  {formatIDR(item.price)}
                  <span className="text-xs ml-1 text-teal-deep/50">IDR</span>
                </span>
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
