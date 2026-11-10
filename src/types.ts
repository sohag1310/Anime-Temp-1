export type MediaType = 'series' | 'movie' | 'anime' | 'cartoon';

export interface Episode {
  number: number;
  title: string;
  id: string;
  image?: string;
  duration?: string;
  link?: string;
  overview?: string;
}

export interface Season {
  season: string | number;
  link?: string;
  episodeCount?: number;
  episodes: Episode[];
}

export interface WatchServer {
  name: string;
  url: string;
  lang?: string;
  quality?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  overview: string;
  backdrop: string;
  image?: string;
  rating?: string | number;
  year?: string | number;
  type?: MediaType | string;
  category?: 'anime' | 'cartoon';
  genres?: string[];
  languages?: string[];
  seasons?: number | string;
  episodes?: number | string;
  networks?: string[];
}

export interface MediaDetail extends MediaItem {
  episodeDuration?: string;
  seasonsList?: Season[];
  watchServers?: WatchServer[];
  recommendations?: Array<{
    id: string;
    title: string;
    image: string;
    type?: string;
    rating?: string;
  }>;
  anilist_id?: number;
  reanime_id?: string;
  animerulz_id?: string;
  tmdb_id?: number;
  studios?: string[];
  status?: string;
}

export interface WatchProgress {
  mediaId: string;
  title: string;
  image: string;
  seasonNumber: number;
  episodeNumber: number;
  episodeTitle: string;
  timestamp: number;
  lastWatchedAt: number;
}

export interface LanguageTrack {
  name: string;
  native: string;
  code: string;
  count: string;
}
