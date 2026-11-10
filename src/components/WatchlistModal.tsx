import React, { useState, useEffect } from 'react';
import { Bookmark, Clock, Trash2, Play, X, Star } from 'lucide-react';
import { MediaItem, WatchProgress } from '../types.ts';
import {
  getStoredWatchlist,
  getStoredHistory,
  clearStoredHistory,
  toggleStoredWatchlist
} from '../utils/media.ts';

interface WatchlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia: (item: any, seasonNum?: number, episodeNum?: number) => void;
  onWatchlistChanged: () => void;
}

export const WatchlistModal: React.FC<WatchlistModalProps> = ({
  isOpen,
  onClose,
  onSelectMedia,
  onWatchlistChanged
}) => {
  const [activeTab, setActiveTab] = useState<'watchlist' | 'history'>('watchlist');
  const [watchlist, setWatchlist] = useState<MediaItem[]>([]);
  const [history, setHistory] = useState<WatchProgress[]>([]);

  useEffect(() => {
    if (isOpen) {
      setWatchlist(getStoredWatchlist());
      setHistory(getStoredHistory());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleRemoveFromWatchlist = (item: MediaItem, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleStoredWatchlist(item);
    setWatchlist(getStoredWatchlist());
    onWatchlistChanged();
  };

  const handleClearHistory = () => {
    clearStoredHistory();
    setHistory([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl bg-[#0f1122] border border-[#232742] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header & Tabs */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#1c1f36] bg-[#13162a]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'watchlist'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-[#1c1f36]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Watchlist ({watchlist.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-[#1c1f36]'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Continue Watching ({history.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'history' && history.length > 0 && (
              <button
                onClick={handleClearHistory}
                className="text-[11px] font-mono text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer mr-1"
                title="Clear all watch history"
              >
                <Trash2 className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-[#1f233a] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          {activeTab === 'watchlist' && (
            <>
              {watchlist.length === 0 ? (
                <div className="py-14 text-center text-slate-400">
                  <Bookmark className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm font-semibold text-slate-300">Your Watchlist is empty</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Click "Watchlist" on any anime or cartoon to save it for later.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {watchlist.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onClose();
                        onSelectMedia(item);
                      }}
                      className="group flex items-center gap-3 p-2.5 rounded-xl bg-[#141628] hover:bg-[#1a1d36] border border-[#20243d] hover:border-indigo-500/50 transition-all cursor-pointer text-left"
                    >
                      <img
                        src={item.image || item.backdrop}
                        alt={item.title}
                        className="w-14 h-18 rounded-lg object-cover bg-[#0b0c16] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-white group-hover:text-indigo-400 truncate">
                          {item.title}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                          <span className="font-mono text-[11px]">{item.year || '2023'}</span>
                          <span>•</span>
                          <span className="capitalize text-indigo-400">{item.type || 'Series'}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleRemoveFromWatchlist(item, e)}
                        className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Remove from Watchlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'history' && (
            <>
              {history.length === 0 ? (
                <div className="py-14 text-center text-slate-400">
                  <Clock className="w-10 h-10 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm font-semibold text-slate-300">No watch history yet</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Titles you start streaming will appear here so you can pick up where you left off.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {history.map((record, idx) => (
                    <div
                      key={`${record.mediaId}-${record.seasonNumber}-${record.episodeNumber}-${idx}`}
                      onClick={() => {
                        onClose();
                        onSelectMedia({ id: record.mediaId, title: record.title }, record.seasonNumber, record.episodeNumber);
                      }}
                      className="group flex items-center justify-between gap-3 p-3 rounded-xl bg-[#141628] hover:bg-[#1a1d36] border border-[#20243d] hover:border-indigo-500/50 transition-all cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={record.image}
                          alt={record.title}
                          className="w-14 h-14 rounded-lg object-cover bg-[#0b0c16] shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="font-semibold text-sm text-white group-hover:text-indigo-400 truncate">
                            {record.title}
                          </h4>
                          <div className="text-xs font-mono text-indigo-400 mt-0.5">
                            Season {record.seasonNumber} • Episode {record.episodeNumber}
                          </div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            {record.episodeTitle}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className="px-3 py-1.5 rounded-lg bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md">
                          <Play className="w-3 h-3 fill-current" />
                          <span>Resume</span>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
