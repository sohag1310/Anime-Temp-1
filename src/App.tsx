import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { HeroBanner } from './components/HeroBanner.tsx';
import { MediaRow } from './components/MediaRow.tsx';
import { WatchPlayer } from './components/WatchPlayer.tsx';
import { CatalogView } from './components/CatalogView.tsx';
import { LanguagesView } from './components/LanguagesView.tsx';
import { LeaderboardView } from './components/LeaderboardView.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { WatchlistModal } from './components/WatchlistModal.tsx';
import { Footer } from './components/Footer.tsx';
import { MediaDetail, MediaItem } from './types.ts';
import { fetchHomeData, fetchMediaDetails, HomeCatalog } from './services/api.ts';
import { getStoredWatchlist } from './utils/media.ts';
import { ALL_SEED_MEDIA, SHINCHAN_DETAILS } from './services/catalogData.ts';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'anime' | 'cartoon' | 'languages' | 'language' | 'leaderboard' | 'watch'>('home');
  const [viewParam, setViewParam] = useState<string>('');
  const [catalog, setCatalog] = useState<HomeCatalog | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Watch view state
  const [activeMediaDetail, setActiveMediaDetail] = useState<MediaDetail | null>(null);
  const [activeSeason, setActiveSeason] = useState(1);
  const [activeEpisode, setActiveEpisode] = useState(1);

  // Modals state
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [watchlistModalOpen, setWatchlistModalOpen] = useState(false);
  const [watchlistCount, setWatchlistCount] = useState(0);

  // Sync watchlist count
  const refreshWatchlistCount = () => {
    setWatchlistCount(getStoredWatchlist().length);
  };

  useEffect(() => {
    refreshWatchlistCount();
  }, []);

  // Fetch home catalog on initial load
  useEffect(() => {
    async function loadCatalog() {
      setLoading(true);
      try {
        const data = await fetchHomeData();
        setCatalog(data);
      } catch (err) {
        console.error('Failed to load catalog:', err);
      } finally {
        setLoading(false);
      }
    }
    loadCatalog();
  }, []);

  // Listen to URL hash or query params for direct links (e.g. series-shinchan)
  useEffect(() => {
    function handleLocation() {
      const hash = window.location.hash.replace(/^#/, '');
      const searchParams = new URLSearchParams(window.location.search);
      const queryId = searchParams.get('id') || searchParams.get('watch');

      if (queryId) {
        handleOpenMediaById(queryId);
        return;
      }

      if (hash.startsWith('watch/')) {
        const id = hash.replace('watch/', '');
        handleOpenMediaById(id);
      } else if (hash.startsWith('category/')) {
        const cat = hash.replace('category/', '');
        if (cat === 'anime' || cat === 'cartoon') {
          setCurrentView(cat);
        }
      } else if (hash.startsWith('language/')) {
        const lang = hash.replace('language/', '');
        setCurrentView('language');
        setViewParam(lang);
      } else if (hash === 'languages') {
        setCurrentView('languages');
      } else if (hash === 'leaderboard') {
        setCurrentView('leaderboard');
      }
    }

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  // Global keyboard shortcuts (⌘K or Ctrl+K for search)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenMediaById = async (id: string, seasonNum = 1, episodeNum = 1) => {
    setLoading(true);
    try {
      const detail = await fetchMediaDetails(id);
      setActiveMediaDetail(detail);
      setActiveSeason(seasonNum);
      setActiveEpisode(episodeNum);
      setCurrentView('watch');
      window.location.hash = `watch/${id}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setActiveMediaDetail(SHINCHAN_DETAILS);
      setCurrentView('watch');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMedia = (item: MediaItem) => {
    handleOpenMediaById(item.id);
  };

  const handleNavigate = (view: string, param?: string) => {
    if (view === 'watch' && param) {
      handleOpenMediaById(param);
      return;
    }

    if (view === 'home') {
      setCurrentView('home');
      window.location.hash = '';
    } else if (view === 'anime' || view === 'cartoon') {
      setCurrentView(view as any);
      window.location.hash = `category/${view}`;
    } else if (view === 'languages') {
      setCurrentView('languages');
      window.location.hash = 'languages';
    } else if (view === 'language' && param) {
      setCurrentView('language');
      setViewParam(param);
      window.location.hash = `language/${param}`;
    } else if (view === 'leaderboard') {
      setCurrentView('leaderboard');
      window.location.hash = 'leaderboard';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Compile full media items list for catalog
  const allAvailableItems = catalog
    ? [
        ...catalog.hero,
        ...catalog.trending,
        ...catalog.popularSeries,
        ...catalog.popularMovies,
        ...ALL_SEED_MEDIA
      ].reduce<MediaItem[]>((acc, item) => {
        if (!acc.some(existing => existing.id === item.id)) {
          acc.push(item);
        }
        return acc;
      }, [])
    : ALL_SEED_MEDIA;

  return (
    <div className="min-h-screen bg-[#0b0c16] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenWatchlist={() => setWatchlistModalOpen(true)}
        watchlistCount={watchlistCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {loading && !catalog && !activeMediaDetail ? (
          <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
              <img
                src="/images/favicon.webp"
                alt="ToonPlay"
                className="absolute w-8 h-8 rounded-full"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-base font-bold text-white tracking-wide">Loading ToonPlay</h2>
              <p className="text-xs font-mono text-indigo-400">CONNECTING STREAM CATALOG...</p>
            </div>
          </div>
        ) : (
          <>
            {/* View: Home */}
            {currentView === 'home' && catalog && (
              <div className="animate-in fade-in duration-300">
                {/* Spotlight Hero Carousel */}
                <HeroBanner
                  items={catalog.hero}
                  onSelectMedia={handleSelectMedia}
                  onWatchNow={handleSelectMedia}
                  onWatchlistChanged={refreshWatchlistCount}
                />

                {/* Content Rows */}
                <div className="space-y-4 sm:space-y-6 pt-2">
                  {/* Trending Now */}
                  <MediaRow
                    title="🔥 Trending Now"
                    subtitle="Most popular animated shows right now"
                    items={catalog.trending}
                    onSelectMedia={handleSelectMedia}
                    onViewAll={() => handleNavigate('anime')}
                    aspect="portrait"
                  />

                  {/* Popular Cartoon Series (featuring Shinchan, Doraemon, Ben 10) */}
                  <MediaRow
                    title="🎨 Most Popular Cartoons"
                    subtitle="Legendary kids & family favorites with Hindi, Tamil & Telugu audio"
                    items={catalog.popularSeries.filter(s => s.category === 'cartoon' || s.id.includes('shinchan') || s.id.includes('doraemon') || s.id.includes('ben-10'))}
                    onSelectMedia={handleSelectMedia}
                    onViewAll={() => handleNavigate('cartoon')}
                    aspect="portrait"
                  />

                  {/* Top Anime TV Series */}
                  <MediaRow
                    title="⚔️ Top Anime Series"
                    subtitle="Binge-worthy action, fantasy and shonen anime"
                    items={catalog.popularSeries.filter(s => s.category !== 'cartoon')}
                    onSelectMedia={handleSelectMedia}
                    onViewAll={() => handleNavigate('anime')}
                    aspect="portrait"
                  />

                  {/* Blockbuster Anime Movies */}
                  <MediaRow
                    title="🎬 Blockbuster Anime Movies"
                    subtitle="Acclaimed animated feature films in stunning 1080p HD"
                    items={catalog.popularMovies}
                    onSelectMedia={handleSelectMedia}
                    onViewAll={() => handleNavigate('anime')}
                    aspect="portrait"
                  />

                  {/* Latest Releases */}
                  <MediaRow
                    title="⚡ Latest Releases"
                    subtitle="Freshly updated episodes and new seasons"
                    items={catalog.latestReleases}
                    onSelectMedia={handleSelectMedia}
                    aspect="portrait"
                  />
                </div>
              </div>
            )}

            {/* View: Anime Catalog */}
            {currentView === 'anime' && (
              <CatalogView
                category="anime"
                items={allAvailableItems}
                onSelectMedia={handleSelectMedia}
              />
            )}

            {/* View: Cartoon Catalog */}
            {currentView === 'cartoon' && (
              <CatalogView
                category="cartoon"
                items={allAvailableItems}
                onSelectMedia={handleSelectMedia}
              />
            )}

            {/* View: Languages Hub */}
            {(currentView === 'languages' || currentView === 'language') && (
              <LanguagesView
                initialLanguage={viewParam || 'hindi'}
                items={allAvailableItems}
                onSelectMedia={handleSelectMedia}
              />
            )}

            {/* View: Leaderboard */}
            {currentView === 'leaderboard' && (
              <LeaderboardView
                items={allAvailableItems}
                onSelectMedia={handleSelectMedia}
              />
            )}

            {/* View: Watch Stream Player */}
            {currentView === 'watch' && activeMediaDetail && (
              <WatchPlayer
                media={activeMediaDetail}
                initialSeason={activeSeason}
                initialEpisode={activeEpisode}
                onSelectMedia={handleSelectMedia}
                onWatchlistChanged={refreshWatchlistCount}
              />
            )}
          </>
        )}
      </main>

      {/* Global Search Modal */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectMedia={handleSelectMedia}
      />

      {/* Watchlist & History Modal */}
      <WatchlistModal
        isOpen={watchlistModalOpen}
        onClose={() => setWatchlistModalOpen(false)}
        onSelectMedia={(item, sNum, epNum) => {
          handleOpenMediaById(item.id, sNum || 1, epNum || 1);
        }}
        onWatchlistChanged={refreshWatchlistCount}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
