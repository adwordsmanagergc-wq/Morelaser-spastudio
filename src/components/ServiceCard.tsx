'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export default function ServiceCard({
  title,
  description,
  href,
  icon,
  image,
  index = 0
}: {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
  image?: string;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={href} className="group block h-full">
        <article className="relative overflow-hidden bg-cream border border-teal-deep/10 card-hover h-full">
          {image && (
            <div className="relative h-56 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-deep/40 to-transparent" />
            </div>
          )}
          <div className="p-8 md:p-10">
            {icon && (
              <div className="text-gold mb-6 transition-transform duration-500 group-hover:scale-110">
                {icon}
              </div>
            )}
            <h3 className="text-2xl md:text-3xl mb-3 text-teal-deep">{title}</h3>
            <p className="text-sm md:text-base text-teal-deep/70 leading-relaxed">
              {description}
            </p>
            <span className="mt-8 inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-gold group-hover:gap-3 transition-all">
              Discover <ArrowUpRight size={14} />
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
