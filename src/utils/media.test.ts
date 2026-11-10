import test from 'node:test';
import assert from 'node:assert/strict';
import { formatEpisodeTitle, formatDuration, filterMedia } from './media.ts';
import { MediaItem } from '../types.ts';

test('formatEpisodeTitle formats episode codes into clean labels', () => {
  assert.equal(formatEpisodeTitle('Shinchan 1x1', 1, 1), 'Episode 1');
  assert.equal(formatEpisodeTitle('Shinchan 2x15', 2, 15), 'Episode 15');
  assert.equal(formatEpisodeTitle('The Beginning', 1, 1), 'The Beginning');
  assert.equal(formatEpisodeTitle('', 3, 4), 'Season 3 - Episode 4');
});

test('formatDuration converts numbers and strings to readable minutes and hours', () => {
  assert.equal(formatDuration(24), '24m');
  assert.equal(formatDuration(95), '1h 35m');
  assert.equal(formatDuration('22min'), '22m');
  assert.equal(formatDuration('120'), '2h');
  assert.equal(formatDuration(), '24m');
});

test('filterMedia filters by search query and type', () => {
  const sampleItems: MediaItem[] = [
    {
      id: 'series-shinchan',
      title: 'Shinchan',
      overview: 'Mischievous 5-year-old boy in Kasukabe',
      backdrop: 'https://example.com/shinchan.jpg',
      type: 'series',
      rating: 8.7,
      year: 1992,
      genres: ['Comedy', 'Slice of Life'],
      languages: ['Hindi', 'Telugu', 'Tamil', 'Japanese']
    },
    {
      id: 'series-pokemon',
      title: 'Pokemon',
      overview: 'Ash Ketchum journeys to become Pokemon master',
      backdrop: 'https://example.com/pokemon.jpg',
      type: 'series',
      rating: 8.1,
      year: 1997,
      genres: ['Action', 'Adventure'],
      languages: ['Hindi', 'English', 'Japanese']
    },
    {
      id: 'movie-your-name',
      title: 'Your Name',
      overview: 'Two strangers find themselves linked in a bizarre way',
      backdrop: 'https://example.com/yourname.jpg',
      type: 'movie',
      rating: 8.9,
      year: 2016,
      genres: ['Drama', 'Supernatural'],
      languages: ['Japanese', 'English']
    }
  ];

  // Test search query
  const searchResults = filterMedia(sampleItems, { query: 'kasukabe' });
  assert.equal(searchResults.length, 1);
  assert.equal(searchResults[0].id, 'series-shinchan');

  // Test type filter
  const movies = filterMedia(sampleItems, { type: 'movies' });
  assert.equal(movies.length, 1);
  assert.equal(movies[0].id, 'movie-your-name');

  // Test genre filter
  const comedy = filterMedia(sampleItems, { genre: 'Comedy' });
  assert.equal(comedy.length, 1);
  assert.equal(comedy[0].id, 'series-shinchan');

  // Test language filter
  const hindi = filterMedia(sampleItems, { language: 'Hindi' });
  assert.equal(hindi.length, 2);

  // Test sorting by rating
  const sorted = filterMedia(sampleItems, { sortBy: 'rating' });
  assert.equal(sorted[0].id, 'movie-your-name');
  assert.equal(sorted[1].id, 'series-shinchan');
});
