import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MediaItem } from '../types.ts';
import { MediaCard } from './MediaCard.tsx';

interface MediaRowProps {
  title: string;
  subtitle?: string;
  items: MediaItem[];
  onSelectMedia: (item: MediaItem) => void;
  onViewAll?: () => void;
  aspect?: 'portrait' | 'landscape';
}

export const MediaRow: React.FC<MediaRowProps> = ({
  title,
  subtitle,
  items,
  onSelectMedia,
  onViewAll,
  aspect = 'portrait'
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -600 : 600;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="relative py-4 sm:py-6">
      {/* Header */}
      <div className="flex items-end justify-between mb-3 sm:mb-4 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer mr-2"
            >
              View All →
            </button>
          )}

          <div className="hidden sm:flex items-center gap-1.5">
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded-lg bg-[#141626] hover:bg-[#1f223d] border border-[#232742] text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label={`Scroll ${title} left`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-lg bg-[#141626] hover:bg-[#1f223d] border border-[#232742] text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label={`Scroll ${title} right`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Scrolling Container */}
      <div
        ref={scrollRef}
        className="flex items-stretch gap-3 sm:gap-4 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 scroll-smooth"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`shrink-0 ${
              aspect === 'portrait' ? 'w-36 sm:w-44 md:w-48' : 'w-60 sm:w-72'
            }`}
          >
            <MediaCard item={item} onClick={onSelectMedia} aspect={aspect} />
          </div>
        ))}
      </div>
    </section>
  );
};
