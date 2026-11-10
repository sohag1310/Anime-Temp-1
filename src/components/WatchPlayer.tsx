import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Server,
  Volume2,
  Download,
  Share2,
  Moon,
  Sun,
  Maximize2,
  Check,
  Plus,
  Star,
  Info,
  AlertCircle,
  Radio
} from 'lucide-react';
import { MediaDetail, Episode, WatchServer } from '../types.ts';
import { extractEpisodeStream } from '../services/api.ts';
import { EpisodeSelector } from './EpisodeSelector.tsx';
import { MediaRow } from './MediaRow.tsx';
import {
  isItemInWatchlist,
  toggleStoredWatchlist,
  saveWatchProgress,
  formatEpisodeTitle
} from '../utils/media.ts';

interface WatchPlayerProps {
  media: MediaDetail;
  initialSeason?: number;
  initialEpisode?: number;
  onSelectMedia: (item: any) => void;
  onWatchlistChanged?: () => void;
}

export const WatchPlayer: React.FC<WatchPlayerProps> = ({
  media,
  initialSeason = 1,
  initialEpisode = 1,
  onSelectMedia,
  onWatchlistChanged
}) => {
  const isSeries = media.type === 'series' || (media.seasonsList && media.seasonsList.length > 0);
  
  const [currentSeason, setCurrentSeason] = useState(initialSeason);
  const [currentEpisode, setCurrentEpisode] = useState(initialEpisode);
  const [servers, setServers] = useState<WatchServer[]>(media.watchServers || []);
  const [activeServerIndex, setActiveServerIndex] = useState(0);
  const [activeLang, setActiveLang] = useState<string>('Hindi');
  const [loadingStream, setLoadingStream] = useState(false);
  const [autoNext, setAutoNext] = useState(true);
  const [cinemaLights, setCinemaLights] = useState(false);
  const [theaterMode, setTheaterMode] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(isItemInWatchlist(media.id));
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  // Get active season & episode details
  const seasonsList = media.seasonsList || [];
  const activeSeasonData = seasonsList.find(s => Number(s.season) === currentSeason) || seasonsList[0];
  const episodes = activeSeasonData?.episodes || [];
  const activeEpisodeData = episodes.find(e => e.number === currentEpisode) || episodes[0];

  // Load stream servers when episode changes
  useEffect(() => {
    let isCancelled = false;

    async function loadEpisodeServers() {
      if (!isSeries || !activeEpisodeData) {
        setServers(media.watchServers || []);
        return;
      }

      setLoadingStream(true);
      try {
        const streamServers = await extractEpisodeStream(activeEpisodeData.link || activeEpisodeData.id);
        if (!isCancelled && streamServers && streamServers.length > 0) {
          setServers(streamServers);
          setActiveServerIndex(0);
        }
      } catch {
        if (!isCancelled) setServers(media.watchServers || []);
      } finally {
        if (!isCancelled) setLoadingStream(false);
      }
    }

    loadEpisodeServers();

    // Save to watch progress
    if (activeEpisodeData) {
      saveWatchProgress({
        mediaId: media.id,
        title: media.title,
        image: activeEpisodeData.image || media.image || media.backdrop,
        seasonNumber: currentSeason,
        episodeNumber: currentEpisode,
        episodeTitle: activeEpisodeData.title || `Episode ${currentEpisode}`,
        timestamp: 0,
        lastWatchedAt: Date.now()
      });
    }

    return () => {
      isCancelled = true;
    };
  }, [media.id, currentSeason, currentEpisode, isSeries]);

  const activeServer = servers[activeServerIndex] || servers[0];

  // Navigation handlers
  const handlePrevEpisode = () => {
    if (currentEpisode > 1) {
      setCurrentEpisode(currentEpisode - 1);
    } else if (currentSeason > 1) {
      const prevSeasonNum = currentSeason - 1;
      const prevSeasonData = seasonsList.find(s => Number(s.season) === prevSeasonNum);
      if (prevSeasonData && prevSeasonData.episodes?.length) {
        setCurrentSeason(prevSeasonNum);
        setCurrentEpisode(prevSeasonData.episodes[prevSeasonData.episodes.length - 1].number);
      }
    }
  };

  const handleNextEpisode = () => {
    if (activeSeasonData && currentEpisode < activeSeasonData.episodes.length) {
      setCurrentEpisode(currentEpisode + 1);
    } else if (currentSeason < seasonsList.length) {
      const nextSeasonNum = currentSeason + 1;
      setCurrentSeason(nextSeasonNum);
      setCurrentEpisode(1);
    }
  };

  const handleToggleWatchlist = () => {
    const status = toggleStoredWatchlist(media);
    setInWatchlist(status);
    if (onWatchlistChanged) onWatchlistChanged();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareToast(true);
      setTimeout(() => setShareToast(false), 2500);
    }
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${cinemaLights ? 'bg-black' : 'bg-[#0b0c16]'}`}>
      {/* Lights out overlay */}
      {cinemaLights && (
        <div
          onClick={() => setCinemaLights(false)}
          className="fixed inset-0 bg-black/85 z-30 transition-opacity backdrop-blur-xs cursor-pointer"
          title="Click to turn lights back on"
        />
      )}

      {/* Main Player Section */}
      <div className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-6 relative z-30 ${theaterMode ? 'max-w-full' : ''}`}>
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-slate-400 mb-2.5 sm:mb-3 overflow-x-auto no-scrollbar whitespace-nowrap">
          <span className="hover:text-indigo-400 cursor-pointer shrink-0" onClick={() => window.history.back()}>
            Home
          </span>
          <span className="shrink-0">/</span>
          <span className="text-slate-300 font-semibold truncate max-w-[160px] sm:max-w-none">{media.title}</span>
          {isSeries && (
            <>
              <span className="shrink-0">/</span>
              <span className="text-indigo-400 shrink-0">
                S{currentSeason} - Ep {currentEpisode}
              </span>
            </>
          )}
        </div>

        {/* Video Player Frame Container */}
        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-[#1e223b] shadow-2xl">
          <div className="relative aspect-video w-full bg-black flex items-center justify-center">
            {loadingStream ? (
              <div className="flex flex-col items-center gap-3 text-slate-400 px-4 text-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-[11px] sm:text-xs font-mono tracking-wider">CONNECTING TO FAST STREAM SERVER...</span>
              </div>
            ) : activeServer?.url ? (
              <iframe
                key={activeServer.url}
                src={activeServer.url}
                title={`${media.title} Player`}
                className="w-full h-full border-0"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-400 p-6 text-center">
                <AlertCircle className="w-8 h-8 text-amber-400" />
                <p className="text-sm font-medium text-slate-200">Stream server is warming up</p>
                <button
                  onClick={() => setActiveServerIndex(0)}
                  className="mt-2 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold"
                >
                  Reload Stream
                </button>
              </div>
            )}
          </div>

          {/* Quick Toolbar Under Player */}
          <div className="bg-[#0f1122] border-t border-[#1a1d35] p-2.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            {/* Left: Server and Audio Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-wrap">
              {/* Server selection */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-slate-400 flex items-center gap-1 text-[11px] shrink-0">
                  <Server className="w-3.5 h-3.5 text-indigo-400" />
                  Server:
                </span>
                <div className="flex items-center gap-1 flex-wrap">
                  {servers.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveServerIndex(idx)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all cursor-pointer ${
                        activeServerIndex === idx
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-[#181a30] hover:bg-[#202442] text-slate-300 border border-[#2b3050]'
                      }`}
                    >
                      {s.name || `Server ${idx + 1}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Language / Audio Tracks Switcher */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-slate-400 flex items-center gap-1 text-[11px] shrink-0">
                  <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
                  Audio:
                </span>
                <div className="flex items-center gap-1 flex-wrap">
                  {['Hindi', 'Tamil', 'Telugu', 'English', 'Japanese'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setActiveLang(lang);
                        const matchIdx = servers.findIndex(s => s.name?.toLowerCase().includes(lang.toLowerCase()) || s.lang?.toLowerCase().includes(lang.toLowerCase()));
                        if (matchIdx >= 0) setActiveServerIndex(matchIdx);
                      }}
                      className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded text-[10px] sm:text-[11px] font-medium transition-all cursor-pointer ${
                        activeLang === lang
                          ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-[#181a30] hover:bg-[#202442] text-slate-400 border border-[#2b3050]'
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Player Utility Actions Bar */}
            <div className="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1a1d35]">
              {/* Prev / Next Episode */}
              {isSeries && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevEpisode}
                    disabled={currentEpisode <= 1 && currentSeason <= 1}
                    className="p-1.5 rounded-lg bg-[#181a30] hover:bg-[#202442] disabled:opacity-40 text-slate-300 hover:text-white border border-[#2b3050] cursor-pointer"
                    title="Previous Episode"
                    aria-label="Previous Episode"
                  >
                    <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={handleNextEpisode}
                    className="p-1.5 rounded-lg bg-[#181a30] hover:bg-[#202442] text-slate-300 hover:text-white border border-[#2b3050] cursor-pointer"
                    title="Next Episode"
                    aria-label="Next Episode"
                  >
                    <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              )}

              {/* Auto next toggle */}
              {isSeries && (
                <button
                  onClick={() => setAutoNext(!autoNext)}
                  className={`flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg border font-mono text-[10px] sm:text-[11px] cursor-pointer ${
                    autoNext
                      ? 'bg-indigo-600/20 text-indigo-400 border-indigo-500/40'
                      : 'bg-[#181a30] text-slate-400 border-[#2b3050]'
                  }`}
                  title="Toggle Auto Next Episode"
                >
                  <Radio className="w-3 h-3" />
                  <span>Auto-Next</span>
                </button>
              )}

              {/* Theater Mode (desktop only) */}
              <button
                onClick={() => setTheaterMode(!theaterMode)}
                className={`hidden sm:flex p-1.5 rounded-lg border text-slate-300 hover:text-white transition-colors cursor-pointer ${
                  theaterMode ? 'bg-indigo-600/20 border-indigo-500 text-indigo-400' : 'bg-[#181a30] border-[#2b3050]'
                }`}
                title="Toggle Theater Mode"
                aria-label="Theater Mode"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Cinema Lights */}
              <button
                onClick={() => setCinemaLights(!cinemaLights)}
                className={`p-1.5 rounded-lg border text-slate-300 hover:text-white transition-colors cursor-pointer ${
                  cinemaLights ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-[#181a30] border-[#2b3050]'
                }`}
                title={cinemaLights ? 'Turn lights on' : 'Turn lights off'}
                aria-label="Toggle Lights"
              >
                {cinemaLights ? <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
              </button>

              {/* Download */}
              <button
                onClick={() => setShowDownloadModal(true)}
                className="flex items-center gap-1 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#181a30] hover:bg-[#202442] border border-[#2b3050] text-slate-300 hover:text-white font-medium cursor-pointer text-[11px] sm:text-xs"
                title="Download Episode"
              >
                <Download className="w-3.5 h-3.5 text-indigo-400" />
                <span className="hidden sm:inline">Download</span>
              </button>

              {/* Share */}
              <button
                onClick={handleShare}
                className="p-1.5 rounded-lg bg-[#181a30] hover:bg-[#202442] border border-[#2b3050] text-slate-300 hover:text-white cursor-pointer relative"
                title="Share link"
                aria-label="Share"
              >
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                {shareToast && (
                  <span className="absolute -top-8 right-0 bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap z-50">
                    Link Copied!
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Series Metadata & Overview Header */}
        <div className="mt-4 sm:mt-6 flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6 pb-6 border-b border-[#1c1f36]">
          <div className="space-y-2.5 sm:space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
              <span className="px-2 py-0.5 rounded bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 font-semibold uppercase">
                {media.type || 'Series'}
              </span>
              {media.rating && (
                <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{media.rating}</span>
                </span>
              )}
              {media.year && (
                <span className="px-2 py-0.5 rounded bg-[#16182c] text-slate-300 border border-[#252945]">
                  {media.year}
                </span>
              )}
              {media.languages?.map((lang) => (
                <span key={lang} className="px-2 py-0.5 rounded bg-[#16182c] text-indigo-300 border border-[#252945]">
                  {lang}
                </span>
              ))}
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {media.title}
            </h1>

            {isSeries && activeEpisodeData && (
              <div className="text-xs sm:text-sm font-semibold text-indigo-400 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span>
                  Season {currentSeason} Episode {currentEpisode}:
                </span>
                <span className="text-slate-300 font-normal">
                  {formatEpisodeTitle(activeEpisodeData.title, currentSeason, currentEpisode)}
                </span>
              </div>
            )}

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {media.overview}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {media.genres?.map((g) => (
                <span
                  key={g}
                  className="text-[11px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-full bg-[#141629] text-slate-400 border border-[#20243d]"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Action sidecard */}
          <div className="flex flex-row md:flex-col items-center md:items-end gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={handleToggleWatchlist}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                inWatchlist
                  ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                  : 'bg-[#151829] border-[#2b3050] text-slate-200 hover:bg-[#1f233a]'
              }`}
            >
              {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              <span>{inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
            </button>
          </div>
        </div>

        {/* Season & Episode Selector */}
        {isSeries && seasonsList.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <EpisodeSelector
              seasonsList={seasonsList}
              selectedSeason={currentSeason}
              selectedEpisode={currentEpisode}
              onSeasonChange={(sNum) => {
                setCurrentSeason(sNum);
                setCurrentEpisode(1);
              }}
              onSelectEpisode={(sNum, ep) => {
                setCurrentSeason(sNum);
                setCurrentEpisode(ep.number);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Recommendations Row */}
        {media.recommendations && media.recommendations.length > 0 && (
          <div className="mt-8 sm:mt-10">
            <MediaRow
              title="You May Also Like"
              subtitle="Similar popular anime and animated favorites"
              items={media.recommendations as any[]}
              onSelectMedia={onSelectMedia}
            />
          </div>
        )}
      </div>

      {/* Download Options Modal */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#111326] border border-[#262a47] rounded-2xl p-5 sm:p-6 shadow-2xl">
            <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-400" />
              Download Episode
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Select your preferred quality and language track to stream or save offline.
            </p>

            <div className="space-y-2.5">
              <a
                href={activeServer?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#171a33] hover:bg-[#202447] border border-[#2b3057] text-white transition-all text-xs font-semibold"
              >
                <div>
                  <div className="font-bold">1080p Full HD (Fast Server)</div>
                  <div className="text-[11px] text-indigo-400 font-mono mt-0.5">Multi-Audio (Hindi / Tamil / Telugu)</div>
                </div>
                <span className="px-2.5 py-1 bg-indigo-600 rounded-lg text-white">Download</span>
              </a>

              <a
                href={activeServer?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#171a33] hover:bg-[#202447] border border-[#2b3057] text-white transition-all text-xs font-semibold"
              >
                <div>
                  <div className="font-bold">720p HD (Compressed)</div>
                  <div className="text-[11px] text-emerald-400 font-mono mt-0.5">Hindi Dub • Low Data</div>
                </div>
                <span className="px-2.5 py-1 bg-indigo-600 rounded-lg text-white">Download</span>
              </a>

              <a
                href={activeServer?.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-[#171a33] hover:bg-[#202447] border border-[#2b3057] text-white transition-all text-xs font-semibold"
              >
                <div>
                  <div className="font-bold">480p SD (Mobile Friendly)</div>
                  <div className="text-[11px] text-amber-400 font-mono mt-0.5">Multi-Language Dub</div>
                </div>
                <span className="px-2.5 py-1 bg-indigo-600 rounded-lg text-white">Download</span>
              </a>
            </div>

            <button
              onClick={() => setShowDownloadModal(false)}
              className="mt-5 w-full py-2.5 rounded-xl bg-[#1a1d35] hover:bg-[#222645] text-slate-300 font-medium text-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
