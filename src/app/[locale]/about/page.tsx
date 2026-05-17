import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import FadeIn from '@/components/FadeIn';
import { Sun, Sparkles } from 'lucide-react';

export const metadata = { title: 'Our Technology' };

export default function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <About />;
}

function About() {
  const t = useTranslations('about');
  const specs = t.raw('specs') as { label: string; value: string }[];

  return (
    <>
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-gradient-sand">
        <div className="container-edge grid md:grid-cols-12 gap-12 items-end">
          <FadeIn className="md:col-span-7">
            <span className="eyebrow">{t('eyebrow')}</span>
            <h1 className="mt-6">{t('title')}</h1>
            <div className="ornament my-8 !ml-0" />
            <p className="text-lg md:text-xl text-teal-deep/80 max-w-2xl leading-relaxed">
              {t('intro')}
            </p>
          </FadeIn>
          <FadeIn className="md:col-span-5" delay={0.15}>
            <div className="relative w-full max-w-sm mx-auto md:mx-0 md:ml-auto">
              <div
                aria-hidden
                className="absolute -inset-3 md:-inset-4 border border-gold/50 translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6"
              />
              <div className="relative aspect-[456/626] overflow-hidden bg-cream shadow-2xl">
                <Image
                  src="/our-technology.png"
                  alt="MORE Laser Pro 2024 KM1000D — the diode laser in our Ubud studio"
                  fill
                  sizes="(min-width: 768px) 360px, 80vw"
                  quality={90}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 md:-bottom-5 md:-left-5 bg-teal-deep text-cream px-5 py-3 shadow-lg">
                <p className="font-sans text-[10px] uppercase tracking-ultra text-gold">
                  KM1000D · 1200W
                </p>
                <p className="font-serif italic text-base leading-tight mt-1">
                  MORE Laser Pro 2024
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-edge">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">Specs</span>
            <h2 className="mt-4">{t('specsTitle')}</h2>
            <div className="ornament my-6" />
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-teal-deep/10">
            {specs.map((spec, i) => (
              <FadeIn key={spec.label} delay={i * 0.05}>
                <div className="bg-cream p-10 h-full">
                  <span className="font-sans text-[11px] uppercase tracking-ultra text-gold">
                    {spec.label}
                  </span>
                  <p className="mt-3 font-serif text-2xl text-teal-deep leading-tight">
                    {spec.value}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-teal-deep text-cream">
        <div className="container-edge grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <Sparkles className="text-gold mb-6" size={36} strokeWidth={1} />
            <h2 className="text-cream">{t('experienceTitle')}</h2>
            <p className="mt-6 text-cream/80 leading-relaxed">{t('experienceBody')}</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <Sun className="text-gold mb-6" size={36} strokeWidth={1} />
            <h2 className="text-cream">{t('safeTitle')}</h2>
            <p className="mt-6 text-cream/80 leading-relaxed">{t('safeBody')}</p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
