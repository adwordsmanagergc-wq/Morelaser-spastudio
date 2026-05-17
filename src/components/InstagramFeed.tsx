'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Instagram, ArrowUpRight } from 'lucide-react';
import data from '../../data/instagram.json';

export default function InstagramFeed({
  eyebrow,
  title,
  subtitle,
  followLabel
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  followLabel: string;
}) {
  const locale = useLocale() as 'en' | 'ru';
  const handle = data.handle;
  const url = data.url;

  return (
    <section className="section bg-cream">
      <div className="container-edge">
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-end mb-14">
          <div className="md:col-span-7">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="mt-4">{title}</h2>
            <div className="ornament my-6 !ml-0" />
            <p className="text-teal-deep/70 italic font-serif max-w-xl">{subtitle}</p>
          </div>
          <div className="md:col-span-5 flex md:justify-end">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-widest text-teal-deep hover:text-gold transition-colors group"
            >
              <Instagram size={18} strokeWidth={1.5} />
              <span>@{handle}</span>
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {data.tiles.map((tile, i) => {
            const caption = tile.caption[locale];
            return (
              <motion.a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${caption} — open on Instagram`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative block aspect-square overflow-hidden bg-teal-50"
              >
                <Image
                  src={tile.src}
                  alt={caption}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-teal-deep/0 group-hover:bg-teal-deep/55 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Instagram size={26} strokeWidth={1} className="text-cream mb-3" />
                  <p className="font-serif italic text-cream text-sm md:text-base">
                    {caption}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn-outline">
            <Instagram size={14} /> {followLabel} @{handle}
          </a>
        </div>
      </div>
    </section>
  );
}
