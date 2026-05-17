import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Sparkles, Waves, Flower2, Scissors, Layers, MapPin } from 'lucide-react';
import Hero from '@/components/Hero';
import FadeIn from '@/components/FadeIn';
import ServiceCard from '@/components/ServiceCard';
import TestimonialCarousel, { type Testimonial } from '@/components/TestimonialCarousel';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations('home');
  const tc = useTranslations('common');
  const locale = useLocale();
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const testimonials = JSON.parse(JSON.stringify(t.raw('testimonials'))) as Testimonial[];

  const services = [
    {
      key: 'laser',
      icon: <Sparkles strokeWidth={1} size={32} />,
      href: `${prefix}/services`,
      image: '/service-laser.png'
    },
    {
      key: 'endosphere',
      icon: <Waves strokeWidth={1} size={32} />,
      href: `${prefix}/services`,
      image: '/service-endosphere.png'
    },
    {
      key: 'facial',
      icon: <Flower2 strokeWidth={1} size={32} />,
      href: `${prefix}/services`,
      image: '/service-facial.png'
    },
    {
      key: 'shaving',
      icon: <Scissors strokeWidth={1} size={32} />,
      href: `${prefix}/services`,
      image: '/service-shaving.png'
    },
    {
      key: 'combo',
      icon: <Layers strokeWidth={1} size={32} />,
      href: `${prefix}/services`,
      image:
        'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  return (
    <>
      <Hero />

      {/* Intro */}
      <section className="section bg-cream">
        <div className="container-edge grid md:grid-cols-12 gap-12 md:gap-20 items-center">
          <FadeIn className="md:col-span-5">
            <div className="relative w-full max-w-sm mx-auto md:mx-0">
              <div
                aria-hidden
                className="absolute -inset-3 md:-inset-4 border border-gold/50 -translate-x-4 -translate-y-4 md:-translate-x-6 md:-translate-y-6"
              />
              <div className="relative aspect-[520/650] w-full overflow-hidden bg-cream shadow-2xl">
                <Image
                  src="/laser-machine.png"
                  alt="MORE Laser Pro 2024 KM1000D — our diode laser in Ubud"
                  fill
                  sizes="(min-width: 768px) 380px, 80vw"
                  quality={90}
                  className="object-cover"
                />
              </div>
            </div>
          </FadeIn>
          <FadeIn className="md:col-span-7" delay={0.15}>
            <span className="eyebrow">{tc('address')}</span>
            <h2 className="mt-5">{t('introTitle')}</h2>
            <div className="ornament my-8 !ml-0" />
            <p className="text-lg leading-relaxed text-teal-deep/75 max-w-xl">
              {t('introBody')}
            </p>
            <Link href={`${prefix}/about`} className="btn-outline mt-10">
              {tc('learnMore')}
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Featured services */}
      <section className="section bg-gradient-sand">
        <div className="container-edge">
          <FadeIn className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">Édition</span>
            <h2 className="mt-4">{t('featuredTitle')}</h2>
            <div className="ornament my-6" />
            <p className="text-teal-deep/70">{t('featuredSub')}</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((s, i) => (
              <ServiceCard
                key={s.key}
                title={t(`services.${s.key}.title` as 'services.laser.title')}
                description={t(`services.${s.key}.desc` as 'services.laser.desc')}
                href={s.href}
                icon={s.icon}
                image={s.image}
                index={i}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-cream">
        <div className="container-edge grid md:grid-cols-12 gap-12">
          <FadeIn className="md:col-span-4">
            <span className="eyebrow">Feedbacks</span>
            <h2 className="mt-4">{t('testimonialsTitle')}</h2>
            <div className="ornament my-6 !ml-0" />
            <p className="text-teal-deep/70 italic font-serif">{t('testimonialsSub')}</p>
          </FadeIn>
          <FadeIn className="md:col-span-8" delay={0.1}>
            <TestimonialCarousel items={testimonials} />
          </FadeIn>
        </div>
      </section>

      {/* Final CTA + Map */}
      <section className="relative section bg-teal-deep text-cream overflow-hidden">
        <div className="container-edge grid md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <span className="font-sans text-[11px] uppercase tracking-ultra text-gold">
              Reservations
            </span>
            <h2 className="mt-5 text-cream">{t('finalCtaTitle')}</h2>
            <div className="mx-0 my-6 h-px w-12 bg-gold" />
            <p className="text-cream/80 max-w-md">{t('finalCtaBody')}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href={`${prefix}/booking`} className="btn-gold">
                {tc('bookNow')}
              </Link>
              <Link
                href={`${prefix}/contact`}
                className="btn-outline !border-cream/40 !text-cream hover:!bg-cream hover:!text-teal-deep"
              >
                <MapPin size={14} /> {tc('address')}
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="aspect-[5/4] w-full bg-cream/5 border border-cream/15">
              <iframe
                title="MORE Laser & Spa — Ubud"
                src="https://www.openstreetmap.org/export/embed.html?bbox=115.255%2C-8.518%2C115.275%2C-8.498&layer=mapnik&marker=-8.5069%2C115.2625"
                className="w-full h-full grayscale-[0.2] opacity-90"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
