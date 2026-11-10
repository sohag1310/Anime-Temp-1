import React from 'react';
import { MediaItem } from '../types.ts';
import { Trophy, Star, Play, Flame, TrendingUp } from 'lucide-react';

interface LeaderboardViewProps {
  items: MediaItem[];
  onSelectMedia: (item: MediaItem) => void;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  items,
  onSelectMedia
}) => {
  // Sort items by rating
  const sorted = [...items].sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
  const topThree = sorted.slice(0, 3);
  const rest = sorted.slice(3, 15);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Trophy className="w-7 h-7 text-amber-400" />
          <span>Global Streaming Leaderboard</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Top-rated and most streamed anime and cartoons across the community this week.
        </p>
      </div>

      {/* Podium Top 3 */}
      {topThree.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 items-end">
          {/* 2nd Place */}
          <div
            onClick={() => onSelectMedia(topThree[1])}
            className="group relative bg-[#0f1122] border border-slate-700/60 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer hover:border-slate-400 transition-all shadow-xl order-2 md:order-1"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-slate-300 text-slate-900 text-xs font-black shadow flex items-center gap-1">
              <span>🥈 2nd Place</span>
            </div>
            <img
              src={topThree[1].image || topThree[1].backdrop}
              alt={topThree[1].title}
              className="w-24 h-32 rounded-xl object-cover mt-2 mb-3 shadow-md group-hover:scale-105 transition-transform"
            />
            <h3 className="font-bold text-white text-base group-hover:text-indigo-400 transition-colors line-clamp-1">
              {topThree[1].title}
            </h3>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-bold mt-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{topThree[1].rating} / 10</span>
            </div>
            <span className="mt-3 px-4 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 text-xs font-semibold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              Stream Now
            </span>
          </div>

          {/* 1st Place (Gold Champion) */}
          <div
            onClick={() => onSelectMedia(topThree[0])}
            className="group relative bg-gradient-to-b from-[#181a38] to-[#0f1122] border-2 border-amber-500/80 rounded-2xl p-5 flex flex-col items-center text-center cursor-pointer hover:border-amber-400 transition-all shadow-2xl shadow-amber-500/10 order-1 md:order-2 transform md:-translate-y-2"
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-lg flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 fill-slate-950" />
              <span>👑 #1 Champion</span>
            </div>
            <img
              src={topThree[0].image || topThree[0].backdrop}
              alt={topThree[0].title}
              className="w-28 h-36 rounded-xl object-cover mt-2 mb-3 shadow-lg group-hover:scale-105 transition-transform"
            />
            <h3 className="font-extrabold text-white text-lg group-hover:text-amber-400 transition-colors line-clamp-1">
              {topThree[0].title}
            </h3>
            <div className="flex items-center gap-1 text-sm text-amber-400 font-bold mt-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{topThree[0].rating} / 10</span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2 mt-2 px-2">
              {topThree[0].overview}
            </p>
            <span className="mt-4 px-6 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-lg transition-colors flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Watch Champion</span>
            </span>
          </div>

          {/* 3rd Place */}
          <div
            onClick={() => onSelectMedia(topThree[2])}
            className="group relative bg-[#0f1122] border border-amber-800/60 rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer hover:border-amber-600 transition-all shadow-xl order-3"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-700 text-white text-xs font-black shadow flex items-center gap-1">
              <span>🥉 3rd Place</span>
            </div>
            <img
              src={topThree[2].image || topThree[2].backdrop}
              alt={topThree[2].title}
              className="w-24 h-32 rounded-xl object-cover mt-2 mb-3 shadow-md group-hover:scale-105 transition-transform"
            />
            <h3 className="font-bold text-white text-base group-hover:text-indigo-400 transition-colors line-clamp-1">
              {topThree[2].title}
            </h3>
            <div className="flex items-center gap-1 text-xs text-amber-400 font-bold mt-1">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{topThree[2].rating} / 10</span>
            </div>
            <span className="mt-3 px-4 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 text-xs font-semibold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              Stream Now
            </span>
          </div>
        </div>
      )}

      {/* Rest of Leaderboard Table */}
      <div className="bg-[#0f1122] border border-[#1e223b] rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-[#1c1f36] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Community Rankings #4 - #{sorted.length}</span>
          </h3>
        </div>

        <div className="divide-y divide-[#181a30]">
          {rest.map((item, index) => {
            const rank = index + 4;
            return (
              <div
                key={item.id}
                onClick={() => onSelectMedia(item)}
                className="group p-3.5 sm:p-4 flex items-center justify-between gap-4 hover:bg-[#141629] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <span className="font-mono text-sm sm:text-base font-bold text-slate-500 w-6 text-center shrink-0">
                    #{rank}
                  </span>
                  <img
                    src={item.image || item.backdrop}
                    alt={item.title}
                    className="w-12 h-14 rounded-lg object-cover bg-[#0d0f1c] shrink-0 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-white group-hover:text-indigo-400 truncate">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span className="font-mono text-[11px]">{item.year || '2023'}</span>
                      <span>•</span>
                      <span className="text-indigo-400 font-medium capitalize">{item.type || 'Series'}</span>
                      {item.genres && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <span className="hidden sm:inline text-slate-400 truncate max-w-[200px]">
                            {item.genres.slice(0, 2).join(', ')}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1 font-bold text-amber-400 text-xs sm:text-sm">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating || '8.0'}</span>
                  </div>
                  <span className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#181b33] text-indigo-300 text-xs font-semibold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                    <Play className="w-3 h-3 fill-current" />
                    <span>Watch</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
