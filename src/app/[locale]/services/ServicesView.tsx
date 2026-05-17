'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import FadeIn from '@/components/FadeIn';
import PriceTable from '@/components/PriceTable';
import SubscriptionCard from '@/components/SubscriptionCard';
import prices from '../../../../data/prices.json';
import { formatIDR, cn } from '@/lib/cn';

type TabId =
  | 'packages'
  | 'upperBody'
  | 'lowerBody'
  | 'subscriptions'
  | 'shaving'
  | 'combo'
  | 'endosphere'
  | 'facial';

const TABS: { id: TabId; key: string }[] = [
  { id: 'packages', key: 'packages' },
  { id: 'upperBody', key: 'upperBody' },
  { id: 'lowerBody', key: 'lowerBody' },
  { id: 'subscriptions', key: 'subscriptions' },
  { id: 'shaving', key: 'shaving' },
  { id: 'combo', key: 'combo' },
  { id: 'endosphere', key: 'endosphere' },
  { id: 'facial', key: 'facial' }
];

export default function ServicesView() {
  const t = useTranslations('services');
  const tc = useTranslations('categories');
  const cm = useTranslations('common');
  const locale = useLocale() as 'en' | 'ru';
  const [tab, setTab] = useState<TabId>('packages');

  return (
    <>
      <section className="pt-40 md:pt-48 pb-12 bg-gradient-sand">
        <div className="container-edge max-w-4xl">
          <FadeIn>
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1 className="mt-6">{t('title')}</h1>
            <div className="ornament my-8 !ml-0" />
            <p className="text-lg text-teal-deep/80 max-w-2xl">{t('intro')}</p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-cream pb-32">
        <div className="container-edge">
          {/* Tabs */}
          <div className="sticky top-20 z-30 bg-cream/95 backdrop-blur-md border-b border-teal-deep/10 -mx-6 md:-mx-10 px-6 md:px-10 py-4 mb-16 overflow-x-auto">
            <div className="flex gap-2 md:gap-4 whitespace-nowrap">
              {TABS.map((tabItem) => (
                <button
                  key={tabItem.id}
                  onClick={() => setTab(tabItem.id)}
                  className={cn(
                    'px-4 py-2 font-sans text-[11px] uppercase tracking-widest border transition-all',
                    tab === tabItem.id
                      ? 'bg-teal-deep text-cream border-teal-deep'
                      : 'border-teal-deep/20 text-teal-deep/70 hover:border-gold hover:text-gold'
                  )}
                >
                  {t(`tabs.${tabItem.key}`)}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {tab === 'packages' && (
                <PriceTable title={tc('packages')} items={prices.packages.items} />
              )}
              {tab === 'upperBody' && (
                <PriceTable title={tc('upperBody')} items={prices.upperBody.items} />
              )}
              {tab === 'lowerBody' && (
                <PriceTable title={tc('lowerBody')} items={prices.lowerBody.items} />
              )}
              {tab === 'subscriptions' && (
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl text-teal-deep mb-2">
                    {tc('subscriptions')}
                  </h3>
                  <p className="text-teal-deep/60 italic font-serif mb-10">
                    1 · 3 · 5 visits — pricing per visit
                  </p>
                  <SubscriptionCard items={prices.subscriptions.items} />
                </div>
              )}
              {tab === 'shaving' && (
                <div className="grid md:grid-cols-2 gap-16">
                  <PriceTable title={tc('shavingWomen')} items={prices.shavingWomen.items} />
                  <PriceTable title={tc('shavingMen')} items={prices.shavingMen.items} />
                </div>
              )}
              {tab === 'combo' && (
                <div>
                  <h3 className="font-serif text-3xl md:text-4xl text-teal-deep mb-2">
                    {tc('combo')}
                  </h3>
                  <p className="text-teal-deep/60 italic font-serif mb-10">{t('comboNote')}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-16">
                    {prices.combo.options.map((opt, i) => (
                      <motion.div
                        key={opt.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        className="border border-teal-deep/15 p-6"
                      >
                        <p className="font-serif text-xl text-teal-deep">
                          {opt.title[locale]}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <h4 className="font-serif text-2xl md:text-3xl text-teal-deep mb-8">
                    {t('featuredCombosTitle')}
                  </h4>
                  <div className="grid md:grid-cols-3 gap-6">
                    {prices.combo.featured.map((f, i) => (
                      <motion.div
                        key={f.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.08 }}
                        className={cn(
                          'p-8 border relative',
                          i === 0
                            ? 'bg-teal-deep text-cream border-teal-deep'
                            : 'bg-cream border-teal-deep/15'
                        )}
                      >
                        <span
                          className={cn(
                            'inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-widest mb-5',
                            i === 0 ? 'text-gold' : 'text-gold'
                          )}
                        >
                          <Star size={12} /> {f.tag[locale]}
                        </span>
                        <p
                          className={cn(
                            'font-serif text-xl leading-snug mb-8',
                            i === 0 ? 'text-cream' : 'text-teal-deep'
                          )}
                        >
                          {f.name[locale]}
                        </p>
                        <div className="flex items-baseline gap-3">
                          <span
                            className={cn(
                              'line-through text-sm',
                              i === 0 ? 'text-cream/50' : 'text-teal-deep/40'
                            )}
                          >
                            {formatIDR(f.wasPrice)}
                          </span>
                          <span
                            className={cn(
                              'font-serif text-3xl tabular-nums',
                              i === 0 ? 'text-cream' : 'text-teal-deep'
                            )}
                          >
                            {formatIDR(f.price)}
                          </span>
                          <span
                            className={cn(
                              'text-xs',
                              i === 0 ? 'text-cream/60' : 'text-teal-deep/50'
                            )}
                          >
                            {cm('currency')}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              {tab === 'endosphere' && (
                <PriceTable
                  title={tc('endosphere')}
                  caption={prices.endosphere.subtitle[locale]}
                  items={prices.endosphere.items}
                />
              )}
              {tab === 'facial' && (
                <div>
                  <PriceTable title={tc('facial')} items={prices.facial.items} />
                  <div className="mt-12 p-8 border border-teal-deep/15 bg-cream/60">
                    <h4 className="font-serif text-2xl text-teal-deep mb-6">
                      90-min Programs
                    </h4>
                    <ul className="space-y-3">
                      {prices.facial.programs.map((p) => (
                        <li
                          key={p.id}
                          className="font-serif text-lg text-teal-deep flex items-center gap-3"
                        >
                          <span className="h-px w-6 bg-gold" />
                          {p.name[locale]}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-sm italic font-serif text-gold">
                      {prices.facial.addOn[locale]}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
