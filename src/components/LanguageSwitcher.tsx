'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { locales } from '@/i18n';
import { cn } from '@/lib/cn';

export default function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    if (next === locale) return;
    const segments = pathname.split('/');
    if (locales.includes(segments[1] as (typeof locales)[number])) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    const newPath = segments.join('/') || '/';
    startTransition(() => router.replace(newPath));
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest text-teal-deep/80',
        isPending && 'opacity-50',
        className
      )}
    >
      {locales.map((l, i) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-label={`Switch language to ${l}`}
          className={cn(
            'transition-colors',
            l === locale ? 'text-teal-deep' : 'text-teal-deep/40 hover:text-gold'
          )}
        >
          {l.toUpperCase()}
          {i < locales.length - 1 && <span className="ml-3 text-teal-deep/20">·</span>}
        </button>
      ))}
    </div>
  );
}
