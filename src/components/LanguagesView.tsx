import React, { useState } from 'react';
import { MediaItem } from '../types.ts';
import { SUPPORTED_LANGUAGES } from '../utils/media.ts';
import { MediaCard } from './MediaCard.tsx';
import { Globe, Volume2, Sparkles } from 'lucide-react';

interface LanguagesViewProps {
  initialLanguage?: string;
  items: MediaItem[];
  onSelectMedia: (item: MediaItem) => void;
}

export const LanguagesView: React.FC<LanguagesViewProps> = ({
  initialLanguage = 'hindi',
  items,
  onSelectMedia
}) => {
  const [selectedCode, setSelectedCode] = useState(initialLanguage);

  const activeLangObj = SUPPORTED_LANGUAGES.find(l => l.code === selectedCode) || SUPPORTED_LANGUAGES[0];

  // Filter items that have this language (or fallback to seed items matching this audio)
  const filteredItems = items.filter(item => {
    if (!item.languages) return true;
    return item.languages.some(l => 
      l.toLowerCase().includes(activeLangObj.name.toLowerCase()) ||
      l.toLowerCase().includes(activeLangObj.code.toLowerCase())
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Globe className="w-7 h-7 text-indigo-400" />
          <span>Multi-Language Audio Hub</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Stream cartoons and anime dubbed in your native language. Browse by audio track with high fidelity sync.
        </p>
      </div>

      {/* Language Hub Cards Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isSelected = lang.code === selectedCode;
          return (
            <button
              key={lang.code}
              onClick={() => setSelectedCode(lang.code)}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-600/20'
                  : 'bg-[#0f1122] hover:bg-[#15182e] border-[#1e223b]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-base sm:text-lg font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {lang.name}
                  </span>
                  <span className="text-xs font-mono text-indigo-400">{lang.count}</span>
                </div>
                <div className="text-sm font-semibold text-indigo-400 mt-0.5">
                  {lang.native}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-slate-400">
                <Volume2 className="w-3 h-3 text-indigo-400" />
                <span>Audio Tracks</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Titles Section Header */}
      <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#1c1f36]">
        <div className="flex items-center gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <span>{activeLangObj.name} Dubbed & Subbed</span>
            <span className="text-xs font-mono font-normal text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              {filteredItems.length} Available
            </span>
          </h2>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3.5 sm:gap-4">
        {filteredItems.map((item) => (
          <MediaCard key={item.id} item={item} onClick={onSelectMedia} aspect="portrait" />
        ))}
      </div>
    </div>
  );
};
