import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/cn';

export default function Logo({
  className,
  size = 'md',
  href = '/',
  variant = 'dark'
}: {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  variant?: 'dark' | 'light';
}) {
  // Source logo aspect ratio: 1750 × 1099 (≈ 1.59:1)
  const dims = {
    sm: { w: 110, h: 69 },
    md: { w: 150, h: 94 },
    lg: { w: 220, h: 138 }
  }[size];

  return (
    <Link
      href={href}
      aria-label="MORE Laser & Spa"
      className={cn('inline-flex items-center', className)}
    >
      <Image
        src="/logo.png"
        alt="MORE Laser & Spa"
        width={dims.w}
        height={dims.h}
        priority={size === 'lg'}
        className={cn(
          'h-auto w-auto object-contain',
          variant === 'light' && 'brightness-0 invert opacity-95'
        )}
        style={{ maxWidth: dims.w, maxHeight: dims.h }}
      />
    </Link>
  );
}
