import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFound() {
  const locale = useLocale();
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return (
    <section className="min-h-screen flex items-center justify-center px-6 bg-cream">
      <div className="text-center max-w-md">
        <p className="font-sans text-xs uppercase tracking-ultra text-gold">404</p>
        <h1 className="mt-6">Page not found.</h1>
        <p className="mt-6 text-teal-deep/70 italic font-serif">
          The page you seek has slipped into the Ubud mist.
        </p>
        <Link
          href={`${prefix}/`}
          className="inline-block mt-10 border border-teal-deep px-8 py-3 font-sans text-xs uppercase tracking-widest hover:bg-teal-deep hover:text-cream transition-colors"
        >
          Return Home
        </Link>
      </div>
    </section>
  );
}
