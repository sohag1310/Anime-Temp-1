import { MediaItem, Episode, Season, WatchProgress, LanguageTrack } from '../types.ts';

export const SUPPORTED_LANGUAGES: LanguageTrack[] = [
  { name: 'Hindi', native: 'हिन्दी', code: 'hindi', count: 'Dubbed' },
  { name: 'Telugu', native: 'తెలుగు', code: 'telugu', count: 'Dubbed' },
  { name: 'Tamil', native: 'தமிழ்', code: 'tamil', count: 'Dubbed' },
  { name: 'Malayalam', native: 'മലയാളം', code: 'malayalam', count: 'Dubbed' },
  { name: 'Kannada', native: 'ಕನ್ನಡ', code: 'kannada', count: 'Dubbed' },
  { name: 'Bengali', native: 'বাংলা', code: 'bengali', count: 'Dubbed' },
  { name: 'English', native: 'English', code: 'english', count: 'Sub / Dub' },
  { name: 'Japanese', native: '日本語', code: 'japanese', count: 'Original' },
  { name: 'Korean', native: '한국어', code: 'korean', count: 'Sub / Dub' }
];

export const GENRES = [
  'All',
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Fantasy',
  'Sci-Fi',
  'Slice of Life',
  'Supernatural',
  'Mystery',
  'Kids & Family'
];

/**
 * Format episode display title cleanly
 */
export function formatEpisodeTitle(title: string, seasonNum: number, epNum: number): string {
  if (!title) return `Season ${seasonNum} - Episode ${epNum}`;
  // If title is just like "Shinchan 1x1", make it friendly
  const pattern = /^(.*?)\s*(\d+)x(\d+)$/i;
  const match = title.match(pattern);
  if (match) {
    return `Episode ${match[3]}`;
  }
  return title;
}

/**
 * Format minutes into readable hour/min format
 */
export function formatDuration(duration?: string | number): string {
  if (!duration) return '24m';
  if (typeof duration === 'number') {
    if (duration < 60) return `${duration}m`;
    const hrs = Math.floor(duration / 60);
    const mins = duration % 60;
    return mins > 0 ? `${hrs}h ${mins}m` : `${hrs}h`;
  }
  const clean = String(duration).trim().toLowerCase();
  if (clean.endsWith('m') || clean.endsWith('min') || clean.includes('h')) {
    return clean.replace('min', 'm').replace(' ', '');
  }
  const num = parseInt(clean, 10);
  if (!isNaN(num)) {
    return formatDuration(num);
  }
  return clean;
}

/**
 * Filter list of media items based on criteria
 */
export function filterMedia(
  items: MediaItem[],
  options: {
    query?: string;
    type?: string;
    genre?: string;
    language?: string;
    sortBy?: 'popular' | 'newest' | 'rating' | 'title';
  }
): MediaItem[] {
  let filtered = [...items];

  if (options.query && options.query.trim()) {
    const q = options.query.toLowerCase().trim();
    filtered = filtered.filter(item => 
      item.title.toLowerCase().includes(q) ||
      (item.overview && item.overview.toLowerCase().includes(q)) ||
      (item.genres && item.genres.some(g => g.toLowerCase().includes(q)))
    );
  }

  if (options.type && options.type !== 'all') {
    const t = options.type.toLowerCase();
    filtered = filtered.filter(item => {
      const itemType = (item.type || '').toLowerCase();
      if (t === 'series') return itemType === 'series' || itemType === 'tv';
      if (t === 'movies' || t === 'movie') return itemType === 'movie' || itemType === 'movies';
      return itemType === t;
    });
  }

  if (options.genre && options.genre !== 'All') {
    const g = options.genre.toLowerCase();
    filtered = filtered.filter(item => 
      item.genres && item.genres.some(itemGenre => itemGenre.toLowerCase() === g)
    );
  }

  if (options.language && options.language !== 'All' && options.language !== 'all') {
    const lang = options.language.toLowerCase();
    filtered = filtered.filter(item => 
      item.languages && item.languages.some(l => l.toLowerCase().includes(lang))
    );
  }

  if (options.sortBy) {
    if (options.sortBy === 'newest') {
      filtered.sort((a, b) => Number(b.year || 0) - Number(a.year || 0));
    } else if (options.sortBy === 'rating') {
      filtered.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
    } else if (options.sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
  }

  return filtered;
}

/**
 * Local storage manager for watchlist
 */
const WATCHLIST_KEY = 'toonplay_watchlist';
const HISTORY_KEY = 'toonplay_watch_history';

export function getStoredWatchlist(): MediaItem[] {
  try {
    const data = localStorage.getItem(WATCHLIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function isItemInWatchlist(id: string): boolean {
  const list = getStoredWatchlist();
  return list.some(item => item.id === id);
}

export function toggleStoredWatchlist(item: MediaItem): boolean {
  try {
    const list = getStoredWatchlist();
    const index = list.findIndex(i => i.id === item.id);
    let added = false;
    if (index >= 0) {
      list.splice(index, 1);
      added = false;
    } else {
      list.unshift(item);
      added = true;
    }
    localStorage.setItem(WATCHLIST_KEY, JSON.stringify(list));
    return added;
  } catch {
    return false;
  }
}

export function getStoredHistory(): WatchProgress[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveWatchProgress(progress: WatchProgress): void {
  try {
    const list = getStoredHistory().filter(p => p.mediaId !== progress.mediaId);
    list.unshift(progress);
    // Keep last 30 items
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 30)));
  } catch {}
}

export function clearStoredHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {}
}
