import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import FadeIn from '@/components/FadeIn';
import BookingForm from '@/components/BookingForm';

export const metadata = { title: 'Book a Visit' };

export default function BookingPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <BookingView />;
}

function BookingView() {
  const t = useTranslations('booking');

  return (
    <section className="pt-40 md:pt-48 pb-32 bg-gradient-sand">
      <div className="container-edge grid lg:grid-cols-12 gap-12 lg:gap-20">
        <FadeIn className="lg:col-span-5">
          <span className="eyebrow">{t('eyebrow')}</span>
          <h1 className="mt-6">{t('title')}</h1>
          <div className="ornament my-8 !ml-0" />
          <p className="text-lg text-teal-deep/80 max-w-md">{t('intro')}</p>
        </FadeIn>
        <FadeIn className="lg:col-span-7" delay={0.15}>
          <BookingForm />
        </FadeIn>
      </div>
    </section>
  );
}
