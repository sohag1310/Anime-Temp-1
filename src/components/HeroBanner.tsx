import React, { useState, useEffect } from 'react';
import { Play, Plus, Check, Info, Star, ChevronLeft, ChevronRight, Volume2 } from 'lucide-react';
import { MediaItem } from '../types.ts';
import { isItemInWatchlist, toggleStoredWatchlist } from '../utils/media.ts';

interface HeroBannerProps {
  items: MediaItem[];
  onSelectMedia: (item: MediaItem) => void;
  onWatchNow: (item: MediaItem) => void;
  onWatchlistChanged?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  items,
  onSelectMedia,
  onWatchNow,
  onWatchlistChanged
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inWatchlist, setInWatchlist] = useState(false);

  const currentItem = items[currentIndex] || items[0];

  useEffect(() => {
    if (currentItem) {
      setInWatchlist(isItemInWatchlist(currentItem.id));
    }
  }, [currentItem]);

  // Auto rotate every 7 seconds
  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [items.length]);

  if (!currentItem) return null;

  const handleToggleWatchlist = () => {
    const status = toggleStoredWatchlist(currentItem);
    setInWatchlist(status);
    if (onWatchlistChanged) onWatchlistChanged();
  };

  return (
    <div className="relative w-full h-[420px] sm:h-[500px] lg:h-[580px] overflow-hidden bg-[#0b0c16]">
      {/* Background Image with Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentItem.backdrop || currentItem.image}
          alt={currentItem.title}
          className="w-full h-full object-cover object-center filter brightness-90 transform scale-105 transition-all duration-1000 ease-out"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c16] via-[#0b0c16]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0c16] via-[#0b0c16]/80 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0b0c16] to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10 sm:pb-16">
        <div className="max-w-2xl space-y-2.5 sm:space-y-3.5">
          {/* Badges Bar */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium">
            <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
              Spotlight
            </span>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 font-semibold">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{currentItem.rating || '8.8'}</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1c2035] text-slate-300 border border-[#2b3050]">
              {currentItem.year || '2023'}
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1c2035] text-slate-300 border border-[#2b3050] uppercase">
              {currentItem.type || 'Series'}
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] sm:text-[11px] font-semibold">
              HD 1080p
            </span>
            {currentItem.languages && currentItem.languages.length > 0 && (
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#1c2035] text-slate-300 border border-[#2b3050] text-[11px]">
                <Volume2 className="w-3 h-3 text-indigo-400" />
                {currentItem.languages.slice(0, 3).join(', ')}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            {currentItem.title}
          </h1>

          {/* Overview text */}
          <p className="text-xs sm:text-sm md:text-base text-slate-300 line-clamp-2 sm:line-clamp-3 leading-relaxed drop-shadow">
            {currentItem.overview}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => onWatchNow(currentItem)}
              className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white text-white" />
              <span>Watch Now</span>
            </button>

            <button
              onClick={handleToggleWatchlist}
              className={`flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                inWatchlist
                  ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-400 hover:bg-emerald-600/30'
                  : 'bg-[#151829]/80 border-[#2b3050] text-slate-200 hover:bg-[#1f233a] hover:text-white'
              }`}
            >
              {inWatchlist ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              <span>{inWatchlist ? 'In Watchlist' : 'Watchlist'}</span>
            </button>

            <button
              onClick={() => onSelectMedia(currentItem)}
              className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#151829]/80 border border-[#2b3050] text-slate-300 hover:bg-[#1f233a] hover:text-white text-xs sm:text-sm font-medium transition-all cursor-pointer"
            >
              <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
              <span>Details</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Indicators & Prev/Next Arrows */}
      {items.length > 1 && (
        <>
          <button
            onClick={() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white transition-all cursor-pointer hidden sm:flex items-center justify-center backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 text-white transition-all cursor-pointer hidden sm:flex items-center justify-center backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === currentIndex ? 'w-6 bg-indigo-500' : 'w-1.5 bg-white/30 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
