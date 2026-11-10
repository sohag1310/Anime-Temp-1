import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, Play, Sparkles } from 'lucide-react';
import { MediaItem } from '../types.ts';
import { searchMediaApi } from '../services/api.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia: (item: MediaItem) => void;
}

const POPULAR_SEARCHES = [
  'Shinchan',
  'Doraemon',
  'Pokemon',
  'Naruto',
  'Dragon Ball Super',
  'Demon Slayer',
  'Ben 10',
  'Hindi Dubbed',
  'Your Name'
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectMedia
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchMediaApi(query);
        setResults(res);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Global keydown listener for Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 px-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#0f1122] border border-[#232742] rounded-2xl shadow-2xl shadow-black/90 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1c1f36] bg-[#13162a]">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anime, cartoon, movie, or character (e.g. Shinchan, Pokemon)..."
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-[#1f233a] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block text-[11px] font-mono bg-[#1c1f36] text-slate-400 px-2 py-0.5 rounded border border-slate-700/50">
              ESC
            </kbd>
          )}
          <button
            onClick={onClose}
            className="sm:hidden p-1 rounded-full text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Popular Tags */}
        {!query && (
          <div className="p-4 sm:p-5">
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trending Searches</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {POPULAR_SEARCHES.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 rounded-lg bg-[#16182c] hover:bg-indigo-600/20 hover:border-indigo-500/50 border border-[#242845] text-xs text-slate-300 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {loading && (
            <div className="py-8 text-center text-xs font-mono text-slate-400">
              Searching catalog...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm font-medium text-slate-300">No results found for "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching for "Shinchan", "Doraemon", "Naruto" or "Pokemon"</p>
            </div>
          )}

          {!loading && results.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onClose();
                onSelectMedia(item);
              }}
              className="w-full flex items-center gap-3.5 p-2.5 rounded-xl bg-[#141628] hover:bg-[#1a1d36] border border-[#20243d] hover:border-indigo-500/50 text-left transition-all cursor-pointer group"
            >
              <img
                src={item.image || item.backdrop}
                alt={item.title}
                className="w-12 h-16 rounded-lg object-cover bg-[#0b0c16] shrink-0 group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=200&q=80';
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-sm text-white group-hover:text-indigo-400 truncate">
                    {item.title}
                  </h4>
                  {item.rating && (
                    <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{item.rating}</span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                  <span className="font-mono text-[11px]">{item.year || '2023'}</span>
                  <span>•</span>
                  <span className="capitalize text-indigo-300">{item.type || 'Series'}</span>
                  {item.languages && item.languages.length > 0 && (
                    <>
                      <span>•</span>
                      <span className="text-[11px] text-slate-400 truncate">
                        {item.languages.slice(0, 2).join(', ')}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-slate-400 line-clamp-1 mt-1">
                  {item.overview}
                </p>
              </div>

              <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
