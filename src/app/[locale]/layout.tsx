import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyBookCTA from '@/components/StickyBookCTA';
import '../globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap'
});

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap'
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home' });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://morelaserspa.com';
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: 'MORE Laser & Spa · Ubud, Bali',
      template: '%s · MORE Laser & Spa'
    },
    description: t('tagline'),
    alternates: {
      canonical: '/',
      languages: { en: '/en', ru: '/ru' }
    },
    openGraph: {
      title: 'MORE Laser & Spa · Ubud, Bali',
      description: t('tagline'),
      url: siteUrl,
      siteName: 'MORE Laser & Spa',
      locale: locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: 'MORE Laser & Spa · Ubud, Bali',
      description: t('tagline')
    }
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) notFound();
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    name: 'MORE Laser & Spa',
    description:
      'Painless laser hair removal & holistic beauty in Ubud, Bali. MORE Laser Pro 2024 KM1000D diode laser.',
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://morelaserspa.com',
    image: '/og-image.jpg',
    priceRange: 'IDR 80,000 – 7,400,000',
    telephone: '+62 812 3456 7890',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Raya Ubud',
      addressLocality: 'Ubud',
      addressRegion: 'Bali',
      postalCode: '80571',
      addressCountry: 'ID'
    },
    geo: { '@type': 'GeoCoordinates', latitude: -8.5069, longitude: 115.2625 },
    openingHours: 'Mo-Su 10:00-21:00',
    sameAs: [
      `https://instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE ?? 'more.laser.bali'}`
    ]
  };

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-cream text-teal-deep antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Navigation locale={locale} />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <StickyBookCTA />
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
