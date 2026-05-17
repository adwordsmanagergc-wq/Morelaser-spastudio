import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { MapPin, Clock, MessageCircle, Instagram } from 'lucide-react';
import FadeIn from '@/components/FadeIn';

export const metadata = { title: 'Contact' };

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <Contact />;
}

function Contact() {
  const t = useTranslations('contact');
  const tc = useTranslations('common');
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '6281234567890';
  const ig = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'more.laser.bali';

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

      <section className="pb-32 bg-cream">
        <div className="container-edge grid lg:grid-cols-12 gap-12">
          <FadeIn className="lg:col-span-5 space-y-10">
            <div>
              <MapPin className="text-gold mb-3" size={24} strokeWidth={1.5} />
              <span className="eyebrow">{t('addressLabel')}</span>
              <p className="font-serif text-xl text-teal-deep mt-2">
                {tc('address')}
              </p>
            </div>
            <div>
              <Clock className="text-gold mb-3" size={24} strokeWidth={1.5} />
              <span className="eyebrow">{t('hoursLabel')}</span>
              <p className="font-serif text-xl text-teal-deep mt-2">{tc('hours')}</p>
            </div>
            <div>
              <MessageCircle className="text-gold mb-3" size={24} strokeWidth={1.5} />
              <span className="eyebrow">{t('whatsappLabel')}</span>
              <a
                className="block font-serif text-xl text-teal-deep mt-2 hover:text-gold"
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                +{wa}
              </a>
            </div>
            <div>
              <Instagram className="text-gold mb-3" size={24} strokeWidth={1.5} />
              <span className="eyebrow">{t('instagramLabel')}</span>
              <a
                className="block font-serif text-xl text-teal-deep mt-2 hover:text-gold"
                href={`https://instagram.com/${ig}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                @{ig}
              </a>
            </div>

            <a
              href={`https://wa.me/${wa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              <MessageCircle size={14} /> {t('messageUs')}
            </a>
          </FadeIn>

          <FadeIn className="lg:col-span-7" delay={0.15}>
            <div className="aspect-[4/3] w-full border border-teal-deep/15">
              <iframe
                title="MORE Laser & Spa — Ubud"
                src="https://www.openstreetmap.org/export/embed.html?bbox=115.255%2C-8.518%2C115.275%2C-8.498&layer=mapnik&marker=-8.5069%2C115.2625"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-xs text-teal-deep/50 italic font-serif">
              View on{' '}
              <a
                className="underline hover:text-gold"
                href="https://www.openstreetmap.org/?mlat=-8.5069&mlon=115.2625#map=15/-8.5069/115.2625"
                target="_blank"
                rel="noopener noreferrer"
              >
                OpenStreetMap
              </a>
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
