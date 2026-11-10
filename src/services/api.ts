import { MediaDetail, MediaItem, WatchServer } from '../types.ts';
import { ALL_SEED_MEDIA, FEATURED_HEROES, POPULAR_MOVIES, POPULAR_SERIES, SHINCHAN_DETAILS } from './catalogData.ts';

const API_BASE = 'https://animesalt.streamindia.co.in/api';
const EXTRACT_API = 'https://anime.streamindia.co.in/api/extract';

interface HomeApiResponse {
  success: boolean;
  data?: {
    hero?: any[];
    trending?: any[];
    popular_series?: any[];
    popular_movies?: any[];
    latest_releases?: any[];
    global_latest_releases?: any[];
  };
}

export interface HomeCatalog {
  hero: MediaItem[];
  trending: MediaItem[];
  popularSeries: MediaItem[];
  popularMovies: MediaItem[];
  latestReleases: MediaItem[];
}

function normalizeMediaItem(raw: any, defaultCategory: 'anime' | 'cartoon' = 'anime'): MediaItem {
  if (!raw) return ALL_SEED_MEDIA[0];
  const id = String(raw.id || raw.anime_id || raw.slug || '').trim();
  const title = String(raw.title || raw.name || raw.alternative_title || 'Untitled').trim();
  const overview = String(raw.overview || raw.description || raw.synopsis || '').trim();
  const backdrop = raw.backdrop || raw.image || raw.poster || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80';
  const image = raw.image || raw.poster || raw.backdrop || backdrop;
  const rating = raw.rating || raw.score || '8.5';
  const year = raw.year || raw.release_date?.slice(0, 4) || '2023';
  const type = raw.type || (raw.seasons ? 'series' : 'movie');
  
  // Detect cartoon vs anime
  const lowerTitle = title.toLowerCase();
  const isCartoon = lowerTitle.includes('shinchan') || 
                    lowerTitle.includes('doraemon') || 
                    lowerTitle.includes('ben 10') || 
                    lowerTitle.includes('oggy') || 
                    lowerTitle.includes('bheem') || 
                    lowerTitle.includes('motu') || 
                    lowerTitle.includes('tom and jerry') ||
                    defaultCategory === 'cartoon';

  return {
    id,
    title,
    overview,
    backdrop,
    image,
    rating,
    year,
    type,
    category: isCartoon ? 'cartoon' : 'anime',
    genres: Array.isArray(raw.genres) ? raw.genres : ['Animation', 'Comedy'],
    languages: Array.isArray(raw.languages) ? raw.languages : ['Hindi', 'Tamil', 'Telugu', 'Japanese', 'English'],
    seasons: raw.seasons || (type === 'series' ? 1 : undefined),
    episodes: raw.episodes || (type === 'series' ? 24 : undefined),
    networks: Array.isArray(raw.networks) ? raw.networks : []
  };
}

export async function fetchHomeData(): Promise<HomeCatalog> {
  try {
    const res = await fetch(`${API_BASE}/home`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });

    if (res.ok) {
      const json: HomeApiResponse = await res.json();
      if (json.success && json.data) {
        const liveHero = (json.data.hero || []).map(item => normalizeMediaItem(item));
        const liveTrending = (json.data.trending || []).map(item => normalizeMediaItem(item));
        const liveSeries = (json.data.popular_series || []).map(item => normalizeMediaItem(item, 'anime'));
        const liveMovies = (json.data.popular_movies || []).map(item => normalizeMediaItem(item, 'anime'));
        const liveLatest = (json.data.latest_releases || json.data.global_latest_releases || []).map(item => normalizeMediaItem(item));

        return {
          hero: liveHero.length > 0 ? [FEATURED_HEROES[0], ...liveHero] : FEATURED_HEROES,
          trending: liveTrending.length > 0 ? liveTrending : ALL_SEED_MEDIA,
          popularSeries: liveSeries.length > 0 ? [SHINCHAN_DETAILS, ...liveSeries] : POPULAR_SERIES,
          popularMovies: liveMovies.length > 0 ? liveMovies : POPULAR_MOVIES,
          latestReleases: liveLatest.length > 0 ? liveLatest : ALL_SEED_MEDIA.slice(0, 8)
        };
      }
    }
  } catch (err) {
    console.warn('[ToonPlay API] Falling back to preloaded catalog due to network:', err);
  }

  return {
    hero: FEATURED_HEROES,
    trending: ALL_SEED_MEDIA,
    popularSeries: POPULAR_SERIES,
    popularMovies: POPULAR_MOVIES,
    latestReleases: ALL_SEED_MEDIA.slice(0, 8)
  };
}

export async function fetchMediaDetails(id: string): Promise<MediaDetail> {
  const cleanId = id.trim();

  // If Shinchan, return the comprehensive Shinchan suite immediately or enhance with live API
  if (cleanId === 'series-shinchan' || cleanId.includes('shinchan')) {
    try {
      const res = await fetch(`${API_BASE}/info?id=${cleanId}`, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.anime) {
          const liveAnime = json.anime;
          return {
            ...SHINCHAN_DETAILS,
            ...liveAnime,
            id: 'series-shinchan',
            title: liveAnime.title || 'Shinchan',
            seasonsList: liveAnime.seasonsList && liveAnime.seasonsList.length > 0 ? liveAnime.seasonsList : SHINCHAN_DETAILS.seasonsList,
            watchServers: SHINCHAN_DETAILS.watchServers
          };
        }
      }
    } catch {}
    return SHINCHAN_DETAILS;
  }

  // Check seed catalog
  const foundSeed = ALL_SEED_MEDIA.find(m => m.id === cleanId);

  try {
    const res = await fetch(`${API_BASE}/info?id=${cleanId}`, { cache: 'no-store' });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.anime) {
        const liveAnime = json.anime;
        const norm = normalizeMediaItem(liveAnime);
        return {
          ...norm,
          seasonsList: liveAnime.seasonsList || (foundSeed ? (foundSeed.type === 'series' ? [{
            season: 1,
            episodeCount: 24,
            episodes: Array.from({ length: 24 }, (_, i) => ({
              number: i + 1,
              title: `Episode ${i + 1}`,
              id: `episode/${cleanId}-${i + 1}`,
              image: norm.image
            }))
          }] : undefined) : undefined),
          watchServers: liveAnime.watchServers && liveAnime.watchServers.length > 0 ? liveAnime.watchServers : [
            {
              name: 'Server 1 (HD)',
              url: 'https://player.abyssplayer.com/lLGXG8nl5',
              lang: 'Multi-Audio'
            },
            {
              name: 'Server 2 (VIP)',
              url: 'https://ravok.buzz/video/e6be4c22a5963ab00dfe8f3b695b5332',
              lang: 'Hindi'
            }
          ],
          recommendations: liveAnime.recommendations || SHINCHAN_DETAILS.recommendations
        };
      }
    }
  } catch (err) {
    console.warn('[ToonPlay API] Error fetching details for', cleanId, err);
  }

  if (foundSeed) {
    const isSeries = foundSeed.type === 'series';
    return {
      ...foundSeed,
      seasonsList: isSeries ? [
        {
          season: 1,
          episodeCount: 12,
          episodes: Array.from({ length: 12 }, (_, i) => ({
            number: i + 1,
            title: `Episode ${i + 1}`,
            id: `episode/${cleanId}-${i + 1}`,
            image: foundSeed.image,
            duration: '24m'
          }))
        }
      ] : undefined,
      watchServers: [
        {
          name: 'Server 1 (VIP HD)',
          url: 'https://player.abyssplayer.com/lLGXG8nl5',
          lang: 'Multi-Audio'
        },
        {
          name: 'Server 2 (Fast Stream)',
          url: 'https://ravok.buzz/video/e6be4c22a5963ab00dfe8f3b695b5332',
          lang: 'Hindi'
        }
      ],
      recommendations: SHINCHAN_DETAILS.recommendations
    };
  }

  // Fallback default
  return SHINCHAN_DETAILS;
}

export async function extractEpisodeStream(episodeLinkOrId: string): Promise<WatchServer[]> {
  try {
    let targetUrl = episodeLinkOrId;
    if (!targetUrl.startsWith('http')) {
      targetUrl = `https://animesalt.cx/${episodeLinkOrId.replace(/^\/+/, '')}/`;
    }

    const res = await fetch(`${EXTRACT_API}?url=${encodeURIComponent(targetUrl)}`, {
      headers: { Accept: 'application/json' }
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        const servers: WatchServer[] = [];
        if (Array.isArray(json.data.watchServers)) {
          for (const s of json.data.watchServers) {
            if (s.url) {
              // Check if URL has player.php?data= base64
              if (s.url.includes('player.php?data=')) {
                try {
                  const b64 = s.url.split('player.php?data=')[1];
                  const decoded = JSON.parse(atob(b64));
                  if (Array.isArray(decoded)) {
                    for (const item of decoded) {
                      servers.push({
                        name: `${item.language || 'Multi'} Stream`,
                        url: item.link,
                        lang: item.language
                      });
                    }
                  }
                } catch {}
              } else {
                servers.push({
                  name: s.name || 'Server 1',
                  url: s.url,
                  lang: s.lang || 'Multi-Audio'
                });
              }
            }
          }
        }
        if (servers.length > 0) return servers;
      }
    }
  } catch (err) {
    console.warn('[ToonPlay API] Extract stream error:', err);
  }

  // Default fallback servers with multi-language
  return [
    {
      name: 'Server 1 (VIP HD)',
      url: 'https://ravok.buzz/video/e6be4c22a5963ab00dfe8f3b695b5332',
      lang: 'Hindi'
    },
    {
      name: 'Server 2 (Abyss Multi-Audio)',
      url: 'https://player.abyssplayer.com/lLGXG8nl5',
      lang: 'Hindi'
    },
    {
      name: 'Server 3 (Tamil Dub)',
      url: 'https://player.abyssplayer.com/XT09aUCzM',
      lang: 'Tamil'
    },
    {
      name: 'Server 4 (Telugu Dub)',
      url: 'https://player.abyssplayer.com/lH9v7l_Uq1',
      lang: 'Telugu'
    }
  ];
}

export async function searchMediaApi(query: string): Promise<MediaItem[]> {
  const q = query.trim();
  if (!q) return [];

  try {
    const res = await fetch(`${API_BASE}/search?q=${encodeURIComponent(q)}&page=1`);
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data.map((item: any) => normalizeMediaItem(item));
      }
    }
  } catch {}

  // Filter seed catalog
  const lower = q.toLowerCase();
  return ALL_SEED_MEDIA.filter(item => 
    item.title.toLowerCase().includes(lower) ||
    item.overview.toLowerCase().includes(lower) ||
    (item.genres && item.genres.some(g => g.toLowerCase().includes(lower)))
  );
}
