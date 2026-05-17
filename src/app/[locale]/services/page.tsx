import { unstable_setRequestLocale } from 'next-intl/server';
import ServicesView from './ServicesView';

export const metadata = { title: 'Services & Pricing' };

export default function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  return <ServicesView />;
}
