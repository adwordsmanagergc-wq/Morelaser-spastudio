import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Clock, Sparkles, Heart, AlertCircle } from 'lucide-react';
import FadeIn from '@/components/FadeIn';

export const metadata = { title: 'Treatment Information' };

export default function TreatmentPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <Treatment />;
}

function Treatment() {
  const t = useTranslations('treatment');
  const sessions = t.raw('sessions') as string[];
  const prepare = t.raw('prepare') as string[];
  const after = t.raw('after') as string[];
  const contra = t.raw('contraindications') as string[];

  const sections = [
    { Icon: Clock, title: t('sessionsTitle'), items: sessions },
    { Icon: Sparkles, title: t('prepareTitle'), items: prepare },
    { Icon: Heart, title: t('afterTitle'), items: after }
  ];

  return (
    <>
      <section className="pt-40 md:pt-48 pb-16 bg-gradient-sand">
        <div className="container-edge max-w-4xl">
          <FadeIn>
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1 className="mt-6">{t('title')}</h1>
            <div className="ornament my-8 !ml-0" />
          </FadeIn>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-edge">
          <FadeIn className="text-center max-w-xl mx-auto mb-16">
            <h2>{t('sectionsTitle')}</h2>
            <div className="ornament my-6" />
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-teal-deep/10">
            {sections.map(({ Icon, title, items }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div className="bg-cream p-10 md:p-12 h-full">
                  <Icon className="text-gold mb-6" size={32} strokeWidth={1} />
                  <h3 className="font-serif text-2xl text-teal-deep mb-6">{title}</h3>
                  <ul className="space-y-4">
                    {items.map((line, idx) => (
                      <li
                        key={idx}
                        className="flex gap-3 text-sm text-teal-deep/80 leading-relaxed"
                      >
                        <span className="text-gold mt-1">·</span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-teal-deep text-cream">
        <div className="container-edge">
          <div className="grid md:grid-cols-12 gap-12">
            <FadeIn className="md:col-span-4">
              <AlertCircle className="text-gold mb-6" size={32} strokeWidth={1} />
              <span className="font-sans text-[11px] uppercase tracking-ultra text-gold">
                For Your Safety
              </span>
              <h2 className="mt-4 text-cream">{t('contraindicationsTitle')}</h2>
              <p className="mt-6 text-cream/75 italic font-serif">
                {t('contraindicationsIntro')}
              </p>
            </FadeIn>
            <FadeIn className="md:col-span-8" delay={0.1}>
              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
                {contra.map((line, i) => (
                  <li key={i} className="flex gap-3 text-cream/85 text-sm leading-relaxed">
                    <span className="text-gold">·</span>
                    {line}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
