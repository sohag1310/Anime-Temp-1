import React, { useState } from 'react';
import { Season, Episode } from '../types.ts';
import { Play, Search, CheckCircle2 } from 'lucide-react';
import { formatEpisodeTitle } from '../utils/media.ts';

interface EpisodeSelectorProps {
  seasonsList: Season[];
  selectedSeason: number;
  selectedEpisode: number;
  onSelectEpisode: (seasonNum: number, episode: Episode) => void;
  onSeasonChange: (seasonNum: number) => void;
}

export const EpisodeSelector: React.FC<EpisodeSelectorProps> = ({
  seasonsList,
  selectedSeason,
  selectedEpisode,
  onSelectEpisode,
  onSeasonChange
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!seasonsList || seasonsList.length === 0) return null;

  const currentSeasonData = seasonsList.find(s => Number(s.season) === selectedSeason) || seasonsList[0];
  const allEpisodes = currentSeasonData?.episodes || [];

  const filteredEpisodes = searchQuery.trim()
    ? allEpisodes.filter(
        ep =>
          ep.number.toString().includes(searchQuery.trim()) ||
          ep.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
      )
    : allEpisodes;

  return (
    <div className="bg-[#0f1122] border border-[#1e223b] rounded-xl sm:rounded-2xl p-3.5 sm:p-5 shadow-xl">
      {/* Header with Season Tabs and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-4 border-b border-[#1c1f36]">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>Episodes</span>
            <span className="text-[11px] sm:text-xs font-mono font-normal text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              {allEpisodes.length} Episodes
            </span>
          </h3>
        </div>

        {/* Season Selector Dropdown / Pills & Search */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          {seasonsList.length > 1 && (
            <div className="relative flex-1 sm:flex-initial">
              <select
                value={selectedSeason}
                onChange={(e) => onSeasonChange(Number(e.target.value))}
                className="w-full sm:w-auto bg-[#17192f] border border-[#2b3050] text-slate-200 text-xs font-semibold rounded-lg px-2.5 sm:px-3 py-1.5 sm:py-2 pr-7 appearance-none focus:outline-none focus:border-indigo-500 cursor-pointer"
                aria-label="Select season"
              >
                {seasonsList.map((s) => (
                  <option key={s.season} value={s.season}>
                    Season {s.season} ({s.episodeCount || s.episodes?.length} eps)
                  </option>
                ))}
              </select>
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-xs">
                ▼
              </div>
            </div>
          )}

          {/* Quick Filter Search */}
          <div className="relative shrink-0">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Ep #"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-24 sm:w-28 pl-7 pr-2.5 py-1.5 text-xs bg-[#17192f] border border-[#2b3050] text-slate-200 placeholder-slate-500 rounded-lg focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Episode Grid */}
      <div className="mt-3.5 sm:mt-4 max-h-[460px] overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
        {filteredEpisodes.map((ep) => {
          const isPlaying = ep.number === selectedEpisode;
          return (
            <button
              key={ep.number}
              onClick={() => onSelectEpisode(selectedSeason, ep)}
              className={`group flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl text-left transition-all cursor-pointer border ${
                isPlaying
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-[#141628] hover:bg-[#1a1d35] border-[#22253d] text-slate-300 hover:text-white'
              }`}
            >
              {/* Thumbnail */}
              <div className="relative w-14 sm:w-16 h-11 sm:h-12 rounded-lg overflow-hidden shrink-0 bg-[#0d0f1c]">
                <img
                  src={ep.image || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=300&q=80'}
                  alt={ep.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=300&q=80';
                  }}
                />
                {isPlaying ? (
                  <div className="absolute inset-0 bg-indigo-950/70 flex items-center justify-center">
                    <span className="flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-indigo-500"></span>
                    </span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Play className="w-3.5 h-3.5 fill-white text-white ml-0.5" />
                  </div>
                )}
              </div>

              {/* Episode Info */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] sm:text-[11px] font-mono font-bold ${isPlaying ? 'text-indigo-400' : 'text-slate-400'}`}>
                    EP {ep.number}
                  </span>
                  {isPlaying && (
                    <span className="text-[9px] sm:text-[10px] bg-indigo-500 text-white font-semibold px-1 py-0.2 rounded">
                      Playing
                    </span>
                  )}
                </div>
                <div className="text-xs font-medium truncate mt-0.5">
                  {formatEpisodeTitle(ep.title, selectedSeason, ep.number)}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  {ep.duration || '22m'}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
