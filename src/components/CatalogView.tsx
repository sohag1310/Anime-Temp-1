import React, { useState, useMemo } from 'react';
import { MediaItem } from '../types.ts';
import { MediaCard } from './MediaCard.tsx';
import { GENRES, filterMedia, SUPPORTED_LANGUAGES } from '../utils/media.ts';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface CatalogViewProps {
  category: 'anime' | 'cartoon';
  items: MediaItem[];
  onSelectMedia: (item: MediaItem) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  category,
  items,
  onSelectMedia
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'title'>('popular');

  // Filter items matching the category (anime vs cartoon)
  const categoryBaseItems = useMemo(() => {
    return items.filter(item => {
      if (category === 'cartoon') {
        return item.category === 'cartoon' ||
          item.title.toLowerCase().includes('shinchan') ||
          item.title.toLowerCase().includes('doraemon') ||
          item.title.toLowerCase().includes('ben 10') ||
          item.title.toLowerCase().includes('oggy');
      } else {
        return item.category !== 'cartoon';
      }
    });
  }, [items, category]);

  const filteredItems = useMemo(() => {
    return filterMedia(categoryBaseItems, {
      type: selectedType,
      genre: selectedGenre,
      language: selectedLanguage,
      sortBy
    });
  }, [categoryBaseItems, selectedType, selectedGenre, selectedLanguage, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Title & Description */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight capitalize flex items-center gap-2">
          <span>{category === 'anime' ? '🎌 Anime Catalog' : '🎨 Cartoon Catalog'}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {category === 'anime'
            ? 'Explore top-rated Japanese anime series and blockbuster animated movies with multi-language dubs and subs.'
            : 'Stream nostalgic cartoon classics like Shinchan, Doraemon, Ben 10, and modern kids animation.'}
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#0f1122] border border-[#1e223b] rounded-2xl p-4 sm:p-5 mb-8 shadow-xl space-y-4">
        {/* Type Toggle Pills & Sort */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-[#15172b] rounded-xl border border-[#232742]">
            {[
              { id: 'all', label: 'All Titles' },
              { id: 'series', label: 'TV Series' },
              { id: 'movies', label: 'Movies' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedType === t.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-indigo-400" />
              Sort:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#15172b] border border-[#232742] text-slate-200 text-xs font-semibold rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">Release Year</option>
              <option value="title">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Audio Language Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-xs font-mono text-slate-400 shrink-0">Audio:</span>
          <button
            onClick={() => setSelectedLanguage('All')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer border ${
              selectedLanguage === 'All'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                : 'bg-[#15172b] text-slate-400 hover:text-white border-[#232742]'
            }`}
          >
            All Tracks
          </button>
          {SUPPORTED_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.name)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer border ${
                selectedLanguage === lang.name
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                  : 'bg-[#15172b] text-slate-400 hover:text-white border-[#232742]'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>

        {/* Genres Scroll Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1 border-t border-[#1a1c32]">
          <span className="text-xs font-mono text-slate-400 shrink-0">Genre:</span>
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGenre(g)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                selectedGenre === g
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                  : 'bg-[#15172b] text-slate-400 hover:text-white border border-[#232742]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-4 px-1">
        <span>Showing {filteredItems.length} titles</span>
        {selectedGenre !== 'All' && <span>Genre: {selectedGenre}</span>}
      </div>

      {/* Grid of Cards */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center text-slate-400 bg-[#0f1122] rounded-2xl border border-[#1e223b]">
          <p className="text-base font-semibold text-slate-300">No matching titles found</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting the filters or choosing another genre.</p>
          <button
            onClick={() => {
              setSelectedType('all');
              setSelectedGenre('All');
              setSelectedLanguage('All');
            }}
            className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
          {filteredItems.map((item) => (
            <MediaCard key={item.id} item={item} onClick={onSelectMedia} aspect="portrait" />
          ))}
        </div>
      )}
    </div>
  );
};
