'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import { cn } from '@/lib/cn';

const links = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/services', key: 'services' },
  { href: '/treatment-info', key: 'treatment' },
  { href: '/contact', key: 'contact' }
] as const;

export default function Navigation({ locale }: { locale: string }) {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const localePrefix = locale === 'en' ? '' : `/${locale}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled || open
          ? 'bg-cream/90 backdrop-blur-md border-b border-teal-deep/10'
          : 'bg-transparent'
      )}
    >
      <div className="container-edge flex h-20 md:h-24 items-center justify-between">
        <Logo size="sm" href={`${localePrefix}/`} />

        <nav className="hidden lg:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.key}
              href={`${localePrefix}${link.href === '/' ? '/' : link.href}`}
              className="font-sans text-xs uppercase tracking-widest text-teal-deep/80 hover:text-gold transition-colors"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-6">
          <LanguageSwitcher />
          <Link href={`${localePrefix}/booking`} className="btn-primary !px-6 !py-3 text-xs">
            {tc('bookNow')}
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="lg:hidden p-2 text-teal-deep"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden border-t border-teal-deep/10 bg-cream"
          >
            <div className="container-edge py-8 flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.key}
                  href={`${localePrefix}${link.href === '/' ? '/' : link.href}`}
                  onClick={() => setOpen(false)}
                  className="font-serif text-3xl text-teal-deep hover:text-gold transition-colors"
                >
                  {t(link.key)}
                </Link>
              ))}
              <Link
                href={`${localePrefix}/booking`}
                onClick={() => setOpen(false)}
                className="btn-primary self-start mt-4"
              >
                {tc('bookNow')}
              </Link>
              <div className="pt-6 border-t border-teal-deep/10">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
