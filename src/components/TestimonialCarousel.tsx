'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export interface Testimonial {
  name: string;
  city: string;
  quote: string;
}

export default function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(id);
  }, [items.length]);

  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);

  return (
    <div className="relative">
      <Quote className="text-gold/30 mb-6" size={48} strokeWidth={1} />
      <div className="relative min-h-[220px] md:min-h-[180px]">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="pull-quote">"{items[index].quote}"</p>
            <footer className="mt-6 font-sans text-xs uppercase tracking-widest text-teal-deep/70">
              {items[index].name} · <span className="text-gold">{items[index].city}</span>
            </footer>
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center gap-6">
        <button
          aria-label="Previous"
          onClick={prev}
          className="p-2 text-teal-deep/60 hover:text-gold transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-px transition-all duration-500 ${
                i === index ? 'bg-gold w-12' : 'bg-teal-deep/20 w-6'
              }`}
            />
          ))}
        </div>
        <button
          aria-label="Next"
          onClick={next}
          className="p-2 text-teal-deep/60 hover:text-gold transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
