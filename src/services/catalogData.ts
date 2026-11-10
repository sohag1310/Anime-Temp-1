import { MediaDetail, MediaItem } from '../types.ts';

export const FEATURED_HEROES: MediaItem[] = [
  {
    id: 'series-shinchan',
    title: 'Shinchan',
    overview: 'Follow the hilarious and mischievous adventures of Shinnosuke "Shin" Nohara, a cheeky five-year-old boy in Kasukabe, Japan, who always manages to baffle his parents Hiroshi and Misae with his outrageous antics and quick wit.',
    backdrop: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80',
    image: 'https://img.animesalt.cx/images/2746/01.webp',
    rating: 8.8,
    year: 1992,
    type: 'series',
    category: 'cartoon',
    genres: ['Comedy', 'Slice of Life', 'Kids & Family'],
    languages: ['Hindi', 'Telugu', 'Tamil', 'Japanese', 'English'],
    seasons: 12,
    episodes: 650,
    networks: ['TV Asahi', 'Hungama TV']
  },
  {
    id: 'series-pokemon-the-series-the-beginning',
    title: 'Pokemon: Indigo League',
    overview: 'In Pallet Town, Ash Ketchum’s dream of an epic Pokémon journey begins! Along with his stubborn yet loyal companion Pikachu, Ash travels across Kanto to collect Gym Badges, battle rivals, and become the world\'s greatest Pokémon Master.',
    backdrop: 'https://image.tmdb.org/t/p/original/yEDdbQwkrgk3dwNbd3sWoZ3Xe6f.jpg',
    image: 'https://image.tmdb.org/t/p/w500/rOuGm07n59k2W0wZ14TfG5P6p0K.jpg',
    rating: 8.2,
    year: 1997,
    type: 'series',
    category: 'anime',
    genres: ['Action', 'Adventure', 'Fantasy'],
    languages: ['Hindi', 'Tamil', 'Telugu', 'English', 'Japanese'],
    seasons: 5,
    episodes: 276,
    networks: ['TV Tokyo', 'Cartoon Network']
  },
  {
    id: 'series-doraemon',
    title: 'Doraemon',
    overview: 'Doraemon, a robotic cat from the 22nd century, is sent back in time to assist Nobita Nobi, a clumsy and lazy schoolboy. Armed with incredible gadgets from his 4D pocket like the Anywhere Door and Bamboo Copter, every day is a magical escapade!',
    backdrop: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1920&q=80',
    image: 'https://image.tmdb.org/t/p/w500/6kOvdvW82yq1E9k0x7g3aV.jpg',
    rating: 8.5,
    year: 2005,
    type: 'series',
    category: 'cartoon',
    genres: ['Comedy', 'Sci-Fi', 'Kids & Family'],
    languages: ['Hindi', 'Tamil', 'Telugu', 'English', 'Japanese'],
    seasons: 8,
    episodes: 450,
    networks: ['TV Asahi', 'Disney Channel']
  },
  {
    id: 'series-naruto-shippuden',
    title: 'Naruto: Shippuden',
    overview: 'Naruto Uzumaki returns to the Hidden Leaf Village after years of intense training with Jiraiya. Stronger and more determined than ever, he sets out to rescue his best friend Sasuke Uchiha from Orochimaru while confronting the dark shadow of Akatsuki.',
    backdrop: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1920&q=80',
    image: 'https://image.tmdb.org/t/p/w500/kV27j3Nz4d0z7Vp.jpg',
    rating: 8.7,
    year: 2007,
    type: 'series',
    category: 'anime',
    genres: ['Action', 'Adventure', 'Fantasy'],
    languages: ['Hindi', 'English', 'Japanese'],
    seasons: 21,
    episodes: 500,
    networks: ['TV Tokyo']
  },
  {
    id: 'series-demon-slayer',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    overview: 'After tragic events claim his family and turn his sister Nezuko into a demon, kindhearted Tanjiro Kamado embarks on a perilous quest to become a Demon Slayer, seek a cure for his sister, and avenge his loved ones against Muzan Kibutsuji.',
    backdrop: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=1920&q=80',
    image: 'https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuY5.jpg',
    rating: 8.9,
    year: 2019,
    type: 'series',
    category: 'anime',
    genres: ['Action', 'Fantasy', 'Supernatural'],
    languages: ['Hindi', 'English', 'Japanese', 'Tamil'],
    seasons: 4,
    episodes: 55,
    networks: ['Tokyo MX', 'ufotable']
  }
];

export const SHINCHAN_DETAILS: MediaDetail = {
  id: 'series-shinchan',
  title: 'Shinchan',
  overview: 'Shinnosuke "Shin-chan" Nohara is a wildly unorthodox five-year-old boy whose blunt remarks, bizarre dances, and eccentric fascination with beautiful older women continuously exasperate his long-suffering mother Misae and mild-mannered father Hiroshi. Filled with relatable family moments and laugh-out-loud comedy.',
  backdrop: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80',
  image: 'https://img.animesalt.cx/images/2746/01.webp',
  rating: 8.8,
  year: 1992,
  type: 'series',
  category: 'cartoon',
  genres: ['Comedy', 'Animation', 'Slice of Life', 'Kids & Family'],
  languages: ['Hindi', 'Telugu', 'Tamil', 'Japanese', 'English'],
  seasons: 12,
  episodes: 650,
  episodeDuration: '22m',
  networks: ['TV Asahi', 'Hungama TV'],
  status: 'Ongoing',
  watchServers: [
    {
      name: 'Server 1 (VIP HD)',
      url: 'https://ravok.buzz/video/e6be4c22a5963ab00dfe8f3b695b5332',
      lang: 'Hindi',
      quality: '1080p'
    },
    {
      name: 'Server 2 (Multi-Audio)',
      url: 'https://player.abyssplayer.com/lLGXG8nl5',
      lang: 'Hindi / Tamil / Telugu',
      quality: '720p'
    },
    {
      name: 'Server 3 (Tamil Dub)',
      url: 'https://player.abyssplayer.com/XT09aUCzM',
      lang: 'Tamil',
      quality: '720p'
    },
    {
      name: 'Server 4 (Telugu Dub)',
      url: 'https://player.abyssplayer.com/lH9v7l_Uq1',
      lang: 'Telugu',
      quality: '720p'
    }
  ],
  seasonsList: Array.from({ length: 12 }, (_, sIdx) => {
    const sNum = sIdx + 1;
    const epCount = sNum === 1 ? 52 : 36;
    return {
      season: sNum,
      link: `https://animesalt.cx/episode/shinchan-${sNum}x1/`,
      episodeCount: epCount,
      episodes: Array.from({ length: epCount }, (_, eIdx) => {
        const eNum = eIdx + 1;
        const padEp = String(eNum).padStart(2, '0');
        return {
          number: eNum,
          title: `Shinchan Season ${sNum} - Episode ${eNum}`,
          id: `episode/shinchan-${sNum}x${eNum}`,
          image: `https://img.animesalt.cx/images/2746/${padEp}.webp`,
          duration: '22m',
          link: `https://animesalt.cx/episode/shinchan-${sNum}x${eNum}/`,
          overview: `Hilarious adventures in Kasukabe as Shin-chan stirs up unforgettable laughs with Action Kamen and his friends!`
        };
      })
    };
  }),
  recommendations: [
    {
      id: 'series-doraemon',
      title: 'Doraemon',
      image: 'https://image.tmdb.org/t/p/w500/6kOvdvW82yq1E9k0x7g3aV.jpg',
      type: 'series',
      rating: '8.5'
    },
    {
      id: 'series-pokemon-the-series-the-beginning',
      title: 'Pokemon: Indigo League',
      image: 'https://image.tmdb.org/t/p/w500/rOuGm07n59k2W0wZ14TfG5P6p0K.jpg',
      type: 'series',
      rating: '8.2'
    },
    {
      id: 'series-ben-10-classic',
      title: 'Ben 10: Classic',
      image: 'https://image.tmdb.org/t/p/w500/qDq74z34zJp.jpg',
      type: 'series',
      rating: '8.4'
    },
    {
      id: 'series-ninja-hattori',
      title: 'Ninja Hattori-kun',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80',
      type: 'series',
      rating: '8.1'
    }
  ]
};

export const POPULAR_SERIES: MediaItem[] = [
  FEATURED_HEROES[0], // Shinchan
  FEATURED_HEROES[1], // Pokemon
  FEATURED_HEROES[2], // Doraemon
  FEATURED_HEROES[3], // Naruto
  FEATURED_HEROES[4], // Demon Slayer
  {
    id: 'series-dragon-ball-super',
    title: 'Dragon Ball Super',
    overview: 'After defeating Majin Buu, peace has returned to Earth. But danger looms as Beerus, the God of Destruction, awakens from his long slumber seeking the mythical Super Saiyan God!',
    backdrop: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1920&q=80',
    image: 'https://image.tmdb.org/t/p/w500/qeuP7K.jpg',
    rating: 8.3,
    year: 2015,
    type: 'series',
    category: 'anime',
    genres: ['Action', 'Adventure', 'Fantasy'],
    languages: ['Hindi', 'English', 'Japanese'],
    seasons: 5,
    episodes: 131
  },
  {
    id: 'series-jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    overview: 'Yuji Itadori, a high schooler with astonishing physical prowess, swallows the cursed finger of Ryomen Sukuna to protect his friends and is drawn into the brutal world of Jujutsu Sorcerers.',
    backdrop: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1920&q=80',
    image: 'https://image.tmdb.org/t/p/w500/hD1X0.jpg',
    rating: 8.6,
    year: 2020,
    type: 'series',
    category: 'anime',
    genres: ['Action', 'Fantasy', 'Supernatural'],
    languages: ['Hindi', 'English', 'Japanese', 'Tamil'],
    seasons: 2,
    episodes: 47
  },
  {
    id: 'series-solo-leveling',
    title: 'Solo Leveling',
    overview: 'In a world where hunters face deadly monster dungeons, Sung Jinwoo is mocked as the weakest hunter of all mankind. After surviving a dual dungeon trial, a mysterious quest window only he can see unlocks infinite potential.',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    image: 'https://image.tmdb.org/t/p/w500/geCRue.jpg',
    rating: 8.7,
    year: 2024,
    type: 'series',
    category: 'anime',
    genres: ['Action', 'Adventure', 'Fantasy'],
    languages: ['Hindi', 'English', 'Japanese'],
    seasons: 2,
    episodes: 25
  },
  {
    id: 'series-ben-10-classic',
    title: 'Ben 10: Classic',
    overview: 'Ten-year-old Ben Tennyson discovers a mystical alien device known as the Omnitrix inside a crashed meteorite. The device allows him to transform into 10 extraordinary alien heroes with unique superpowers!',
    backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
    image: 'https://image.tmdb.org/t/p/w500/qDq74z34zJp.jpg',
    rating: 8.4,
    year: 2005,
    type: 'series',
    category: 'cartoon',
    genres: ['Action', 'Sci-Fi', 'Kids & Family'],
    languages: ['Hindi', 'Tamil', 'Telugu', 'English'],
    seasons: 4,
    episodes: 52
  },
  {
    id: 'series-oggy-and-the-cockroaches',
    title: 'Oggy and the Cockroaches',
    overview: 'Oggy is a blue, lazy cat who loves watching television and eating, but his peaceful bungalow life is constantly wrecked by three mischievous cockroaches: Joey, Marky, and Dee Dee.',
    backdrop: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1920&q=80',
    image: 'https://image.tmdb.org/t/p/w500/oggy.jpg',
    rating: 7.9,
    year: 1998,
    type: 'series',
    category: 'cartoon',
    genres: ['Comedy', 'Kids & Family'],
    languages: ['Hindi', 'English', 'Tamil'],
    seasons: 7,
    episodes: 156
  }
];

export const POPULAR_MOVIES: MediaItem[] = [
  {
    id: 'movie-your-name',
    title: 'Your Name (Kimi no Na wa)',
    overview: 'High school students Mitsuha in rural Itomori and Taki in bustling Tokyo discover they are suddenly swapping bodies across space and time. As an impending comet approaches, they race to find one another.',
    backdrop: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80',
    image: 'https://image.tmdb.org/t/p/w500/q719So.jpg',
    rating: 8.9,
    year: 2016,
    type: 'movie',
    category: 'anime',
    genres: ['Drama', 'Romance', 'Supernatural'],
    languages: ['Hindi', 'Japanese', 'English'],
    networks: ['CoMix Wave Films']
  },
  {
    id: 'movie-suzume',
    title: 'Suzume',
    overview: 'A 17-year-old girl named Suzume helps a mysterious young traveler close doors releasing supernatural catastrophes and earthquakes across ruins in Japan.',
    backdrop: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1920&q=80',
    image: 'https://image.tmdb.org/t/p/w500/vI.jpg',
    rating: 8.5,
    year: 2022,
    type: 'movie',
    category: 'anime',
    genres: ['Adventure', 'Fantasy', 'Drama'],
    languages: ['Hindi', 'Japanese', 'English']
  },
  {
    id: 'movie-spirited-away',
    title: 'Spirited Away',
    overview: 'Ten-year-old Chihiro and her parents wander into a magical spirit world governed by the sorceress Yubaba. After her parents are turned into pigs, Chihiro must work in a bathhouse to free them.',
    backdrop: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1920&q=80',
    image: 'https://image.tmdb.org/t/p/w500/393.jpg',
    rating: 8.9,
    year: 2001,
    type: 'movie',
    category: 'anime',
    genres: ['Animation', 'Family', 'Fantasy'],
    languages: ['Hindi', 'Japanese', 'English']
  },
  {
    id: 'movie-demon-slayer-mugen-train',
    title: 'Demon Slayer: Mugen Train',
    overview: 'Tanjiro, Nezuko, Zenitsu, and Inosuke board the mysterious Mugen Train to join Flame Hashira Kyojuro Rengoku against the sinister dream demon Enmu and Upper Rank Three Akaza.',
    backdrop: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=1920&q=80',
    image: 'https://image.tmdb.org/t/p/w500/h8g.jpg',
    rating: 8.8,
    year: 2020,
    type: 'movie',
    category: 'anime',
    genres: ['Action', 'Fantasy', 'Animation'],
    languages: ['Hindi', 'English', 'Japanese', 'Tamil']
  },
  {
    id: 'movie-shinchan-bungle-in-the-jungle',
    title: 'Shinchan: Bungle in the Jungle',
    overview: 'The Nohara family and friends embark on an exotic tropical cruise! But when the adults are mysteriously captured by monkeys ruled by Paradise King, Shin-chan and the Kasukabe Defense Force jump into jungle rescue mode!',
    backdrop: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=80',
    image: 'https://img.animesalt.cx/images/2746/02.webp',
    rating: 8.3,
    year: 2000,
    type: 'movie',
    category: 'cartoon',
    genres: ['Animation', 'Comedy', 'Adventure'],
    languages: ['Hindi', 'Telugu', 'Tamil', 'Japanese']
  },
  {
    id: 'movie-doraemon-nobitas-dinosaur',
    title: 'Doraemon: Nobita\'s Dinosaur',
    overview: 'Nobita unearths a real dinosaur fossil and uses the Time Furoshiki to hatch an adorable Plesiosaur named Pisuke. Together with Doraemon, they journey back to the Cretaceous period to bring Pisuke safely home.',
    backdrop: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1920&q=80',
    image: 'https://image.tmdb.org/t/p/w500/dora.jpg',
    rating: 8.2,
    year: 2006,
    type: 'movie',
    category: 'cartoon',
    genres: ['Animation', 'Adventure', 'Sci-Fi'],
    languages: ['Hindi', 'Tamil', 'Telugu', 'Japanese']
  }
];

export const ALL_SEED_MEDIA: MediaItem[] = [
  ...FEATURED_HEROES,
  ...POPULAR_SERIES.filter(s => !FEATURED_HEROES.some(h => h.id === s.id)),
  ...POPULAR_MOVIES
];
