import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, ChevronDown, Bookmark, Send, Menu, X, Play, Trophy, Sparkles } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../utils/media.ts';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenSearch: () => void;
  onOpenWatchlist: () => void;
  watchlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenSearch,
  onOpenWatchlist,
  watchlistCount
}) => {
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1e213d] bg-[#0b0c16]/95 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Desktop Nav */}
        <div className="flex items-center gap-6 xl:gap-8">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
            aria-label="ToonPlay Home"
          >
            <img
              src="/images/toonplay-logo.webp"
              alt="ToonPlay"
              className="h-7 sm:h-8 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                // Fallback text if logo fails
                const target = e.currentTarget;
                target.style.display = 'none';
                const sibling = target.nextElementSibling;
                if (sibling) (sibling as HTMLElement).style.display = 'flex';
              }}
            />
            <div className="hidden items-center gap-1 font-bold text-xl tracking-tight text-white">
              <span>Toon</span>
              <span className="text-indigo-500">Play</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-slate-300">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-indigo-400 transition-colors whitespace-nowrap cursor-pointer ${
                currentView === 'home' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('anime')}
              className={`hover:text-indigo-400 transition-colors whitespace-nowrap cursor-pointer ${
                currentView === 'anime' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              Anime
            </button>
            <button
              onClick={() => onNavigate('cartoon')}
              className={`hover:text-indigo-400 transition-colors whitespace-nowrap cursor-pointer ${
                currentView === 'cartoon' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              Cartoon
            </button>
            <button
              onClick={() => onNavigate('leaderboard')}
              className={`flex items-center gap-1.5 hover:text-indigo-400 transition-colors whitespace-nowrap cursor-pointer ${
                currentView === 'leaderboard' ? 'text-indigo-400 font-semibold' : ''
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Leaderboard</span>
            </button>

            {/* Languages Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                type="button"
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 py-1 hover:text-indigo-400 transition-colors whitespace-nowrap cursor-pointer ${
                  currentView.startsWith('language') ? 'text-indigo-400 font-semibold' : ''
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>Languages</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${langOpen ? 'rotate-180 text-indigo-400' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-[#111324] border border-[#262a42] rounded-xl shadow-2xl shadow-black/80 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-1.5 flex items-center justify-between border-b border-[#1c1f36] mb-1">
                    <span className="text-[10px] font-mono text-indigo-400 uppercase tracking-wider font-semibold">
                      Audio Tracks
                    </span>
                    <button
                      onClick={() => {
                        setLangOpen(false);
                        onNavigate('languages');
                      }}
                      className="text-[10px] font-mono text-slate-400 hover:text-white cursor-pointer"
                    >
                      View All →
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLangOpen(false);
                          onNavigate('language', lang.code);
                        }}
                        className="w-full px-3.5 py-2 text-left text-xs text-slate-300 hover:text-white hover:bg-[#181a32] transition-colors cursor-pointer flex items-center justify-between"
                      >
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-[11px] font-mono text-indigo-400">{lang.native}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Telegram Channel Button */}
          <a
            href="https://t.me/toonplay_official"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer whitespace-nowrap"
            title="Join ToonPlay Telegram Community"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Join Telegram</span>
          </a>

          {/* Quick Search Button */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-[#141624] hover:bg-[#181a2c] hover:text-slate-200 border border-[#262940] hover:border-indigo-500/60 rounded-lg transition-all cursor-pointer"
            aria-label="Search anime and cartoons"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden sm:inline-block text-[10px] bg-[#1e2238] text-slate-400 px-1.5 py-0.5 rounded font-mono border border-slate-700/50">
              ⌘K
            </kbd>
          </button>

          {/* Watchlist & History Trigger */}
          <button
            type="button"
            onClick={onOpenWatchlist}
            className="relative p-2 rounded-lg text-slate-300 hover:text-white bg-[#141624] hover:bg-[#1b1e32] border border-[#262940] transition-colors cursor-pointer"
            aria-label="Watchlist and History"
            title="Watchlist & History"
          >
            <Bookmark className="w-4 h-4 text-indigo-400" />
            {watchlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {watchlistCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white bg-[#141624] border border-[#262940] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0d0f1e] border-b border-[#1e213d] px-4 pt-2 pb-5 space-y-3">
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('home');
              }}
              className={`p-2.5 rounded-lg text-left text-sm font-medium ${
                currentView === 'home' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40' : 'bg-[#141624] text-slate-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('anime');
              }}
              className={`p-2.5 rounded-lg text-left text-sm font-medium ${
                currentView === 'anime' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40' : 'bg-[#141624] text-slate-300'
              }`}
            >
              Anime
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('cartoon');
              }}
              className={`p-2.5 rounded-lg text-left text-sm font-medium ${
                currentView === 'cartoon' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40' : 'bg-[#141624] text-slate-300'
              }`}
            >
              Cartoon
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('leaderboard');
              }}
              className={`p-2.5 rounded-lg text-left text-sm font-medium flex items-center justify-between ${
                currentView === 'leaderboard' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/40' : 'bg-[#141624] text-slate-300'
              }`}
            >
              <span>Leaderboard</span>
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

          <div className="pt-2 border-t border-[#1c1f36]">
            <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2 font-semibold">
              Popular Languages
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SUPPORTED_LANGUAGES.slice(0, 6).map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigate('language', lang.code);
                  }}
                  className="px-2.5 py-1 rounded bg-[#141624] text-xs text-slate-300 hover:text-white border border-[#22263d]"
                >
                  {lang.name} ({lang.native})
                </button>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigate('languages');
                }}
                className="px-2.5 py-1 rounded bg-indigo-600/20 text-xs text-indigo-400 border border-indigo-500/30"
              >
                More Languages →
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
