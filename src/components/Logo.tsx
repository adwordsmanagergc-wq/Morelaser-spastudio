import Link from 'next/link';
import { cn } from '@/lib/cn';

export default function Logo({
  className,
  size = 'md',
  href = '/'
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
}) {
  const sizes = {
    sm: { wrap: 'gap-2', circle: 'w-10 h-10', label: 'text-[8px]' },
    md: { wrap: 'gap-3', circle: 'w-14 h-14', label: 'text-[9px]' },
    lg: { wrap: 'gap-4', circle: 'w-20 h-20', label: 'text-[10px]' }
  } as const;
  const s = sizes[size];

  return (
    <Link
      href={href}
      aria-label="MORE Laser & Spa"
      className={cn('inline-flex flex-col items-center text-teal-deep', s.wrap, className)}
    >
      <span
        className={cn(
          'flex items-center justify-center rounded-full border border-gold/70',
          'font-serif italic tracking-tight',
          s.circle
        )}
      >
        <span className="text-lg md:text-xl leading-none">More</span>
      </span>
      <span className={cn('font-sans uppercase tracking-ultra text-teal-deep/80', s.label)}>
        Laser & Spa
      </span>
    </Link>
  );
}
