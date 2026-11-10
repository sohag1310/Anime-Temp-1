import React from 'react';
import { Star, Play, Layers } from 'lucide-react';
import { MediaItem } from '../types.ts';

interface MediaCardProps {
  item: MediaItem;
  onClick: (item: MediaItem) => void;
  aspect?: 'portrait' | 'landscape';
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  onClick,
  aspect = 'portrait'
}) => {
  const isPortrait = aspect === 'portrait';
  const imgUrl = isPortrait ? (item.image || item.backdrop) : (item.backdrop || item.image);

  return (
    <div
      onClick={() => onClick(item)}
      className="group relative flex flex-col rounded-xl overflow-hidden bg-[#101222] border border-[#1e2238] hover:border-indigo-500/60 shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer"
    >
      {/* Image container */}
      <div className={`relative w-full overflow-hidden bg-[#15172a] ${isPortrait ? 'aspect-[2/3]' : 'aspect-video'}`}>
        <img
          src={imgUrl}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            const target = e.currentTarget;
            if (!target.dataset.fallback) {
              target.dataset.fallback = 'true';
              target.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=600&q=80';
            }
          }}
        />

        {/* Top Floating Badges */}
        <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 right-1.5 sm:right-2 flex items-center justify-between pointer-events-none">
          {item.rating && (
            <span className="flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-md text-amber-400 text-[10px] sm:text-[11px] font-bold border border-white/10 shadow">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span>{typeof item.rating === 'number' ? item.rating.toFixed(1) : item.rating}</span>
            </span>
          )}

          <div className="flex items-center gap-1 ml-auto">
            {item.category === 'cartoon' ? (
              <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] sm:text-[10px] font-black uppercase tracking-wider shadow">
                Cartoon
              </span>
            ) : (
              <span className="px-1.5 py-0.5 rounded bg-indigo-600 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow">
                {item.type || 'Anime'}
              </span>
            )}
          </div>
        </div>

        {/* Bottom image overlay */}
        <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5 bg-gradient-to-t from-[#101222] via-[#101222]/85 to-transparent flex items-center justify-between text-[10px] sm:text-[11px] text-slate-300">
          <span className="font-mono text-slate-400">{item.year || '2023'}</span>
          {item.seasons ? (
            <span className="flex items-center gap-1 font-mono text-indigo-300 font-semibold">
              <Layers className="w-3 h-3" />
              <span>{item.seasons} {Number(item.seasons) === 1 ? 'Season' : 'Seasons'}</span>
            </span>
          ) : (
            <span className="text-[9px] sm:text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Movie
            </span>
          )}
        </div>

        {/* Hover Play Button Overlay */}
        <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/50 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white ml-0.5" />
          </div>
        </div>
      </div>

      {/* Card Info */}
      <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-grow">
        <h3 className="font-semibold text-xs sm:text-sm text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
          {item.title}
        </h3>

        <div className="mt-1 flex items-center justify-between text-xs text-slate-400 gap-1.5">
          <span className="truncate flex-1 text-slate-400 text-[10px] sm:text-[11px]">
            {item.genres?.slice(0, 2).join(' • ') || 'Animation'}
          </span>
          {item.languages && item.languages.length > 0 && (
            <span className="text-[10px] font-mono text-indigo-400 shrink-0">
              {item.languages[0]}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
