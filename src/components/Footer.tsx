import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Instagram, MessageCircle } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '6281234567890';
  const ig = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'more.laser.bali';

  return (
    <footer className="bg-teal-deep text-cream/90">
      <div className="container-edge py-20 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <Logo size="md" variant="light" />
          <p className="mt-6 text-sm leading-relaxed text-cream/70 max-w-xs">
            {t('footer.tagline')}
          </p>
        </div>

        <div>
          <h4 className="font-sans text-xs uppercase tracking-ultra text-gold mb-5">
            {t('footer.explore')}
          </h4>
          <ul className="space-y-3 text-sm">
            <li><Link className="hover:text-gold" href={`${prefix}/about`}>{t('nav.about')}</Link></li>
            <li><Link className="hover:text-gold" href={`${prefix}/services`}>{t('nav.services')}</Link></li>
            <li><Link className="hover:text-gold" href={`${prefix}/treatment-info`}>{t('nav.treatment')}</Link></li>
            <li><Link className="hover:text-gold" href={`${prefix}/booking`}>{t('nav.booking')}</Link></li>
            <li><Link className="hover:text-gold" href={`${prefix}/contact`}>{t('nav.contact')}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-xs uppercase tracking-ultra text-gold mb-5">
            {t('footer.visit')}
          </h4>
          <ul className="space-y-3 text-sm text-cream/80">
            <li>{t('common.address')}</li>
            <li>{t('common.hours')}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans text-xs uppercase tracking-ultra text-gold mb-5">
            {t('footer.follow')}
          </h4>
          <div className="flex flex-col gap-3 text-sm">
            <a
              className="inline-flex items-center gap-2 hover:text-gold"
              href={`https://wa.me/${wa}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
            <a
              className="inline-flex items-center gap-2 hover:text-gold"
              href={`https://instagram.com/${ig}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={16} /> @{ig}
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-edge py-6 flex items-center justify-between text-xs text-cream/50">
          <span>© {new Date().getFullYear()} MORE Laser & Spa · {t('footer.rights')}</span>
          <span className="font-serif italic">Ubud · Bali</span>
        </div>
      </div>
    </footer>
  );
}
