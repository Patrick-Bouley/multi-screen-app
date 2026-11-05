
/*
 * Anime Data
 *
 * Central catalogue containing all anime used throughout the app.
 *
 * Each anime has a unique ID shared by Home, Browse,
 * My Lists, and the future Anime Details screen.
 *
 * All existing Picsum URLs are preserved from the
 * original FeaturedData, TrendingData, and
 * ContinueWatchingData files.
 *
 * Additional image fields can be added later when needed.
 */

// Defines the shared structure of an anime object.
export interface Anime {
  id: string;
  title: string;
  image: string;
  audio: string;

  // Optional information for particular screens.
  featuredImage?: string;
  episodeImage?: string;
  ageRating?: string;
  genres?: string[];
  description?: string;
  episode?: string;
  ratingAverage?: number;
  ratingCount?: string;
}

// Master catalogue used throughout the application.
export const allAnime: Anime[] = [

  // =========================================================
  // Featured Anime
  // =========================================================

  {
    id: "black-clover",
    title: "Black Clover",
    image: "https://picsum.photos/id/184/900/1300",
    // TODO: Add a separate portrait poster if needed.
    featuredImage: "https://picsum.photos/id/184/900/1300",
    episodeImage: "https://picsum.photos/seed/801/640/360",
    audio: "Dub | Sub",
    ageRating: "14+",
    genres: ["Action", "Adventure", "Fantasy", "Shounen"],
    description:
      "Asta and Yuno dream of becoming the Wizard King, but they are born without magic in a world where magic is everything.",
    episode: "Continue Watching S2 E15",
    ratingAverage: 4.5,
    ratingCount: "34.6K"
  },

  {
    id: "demon-slayer",
    title: "Demon Slayer",
    image: "https://picsum.photos/id/239/900/1300",
    // TODO: Add a separate portrait poster if needed.
    featuredImage: "https://picsum.photos/id/239/900/1300",
    episodeImage: "https://picsum.photos/seed/900/640/360",
    audio: "Dub | Sub",
    ageRating: "16+",
    genres: ["Action", "Adventure", "Fantasy"],
    description:
      "Tanjiro Kamado joins the Demon Slayer Corps to find a cure for his sister and avenge his family.",
    episode: "Continue Watching S2 E10",
    ratingAverage: 5,
    ratingCount: "45.6K"
  },

  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    image: "https://picsum.photos/id/314/900/1300",
    // TODO: Add a separate portrait poster if needed.
    featuredImage: "https://picsum.photos/id/314/900/1300",
    // TODO: Add episodeImage if included in Continue Watching.
    audio: "Dub | Sub",
    ageRating: "16+",
    genres: ["Action", "Fantasy", "Supernatural"],
    description:
      "Yuji Itadori joins a secret organization to fight curses and protect humanity.",
    episode: "Start Watching Episode 1",
    ratingAverage: 4.3,
    ratingCount: "42.6K"
  },

  {
    id: "soul-eater",
    title: "Soul Eater",
    image: "https://picsum.photos/id/400/900/1300",
    // TODO: Add a separate portrait poster if needed.
    featuredImage: "https://picsum.photos/id/400/900/1300",
    episodeImage: "https://picsum.photos/seed/1100/640/360",
    audio: "Dub | Sub",
    ageRating: "14+",
    genres: ["Action", "Adventure", "Supernatural"],
    description:
      "Maka Albarn and her weapon partner, Soul Eater, attend the Death Weapon Meister Academy to become skilled fighters against evil souls.",
    episode: "Start Watching Episode 1",
    ratingAverage: 4,
    ratingCount: "18.3K"
  },

  {
    id: "frieren",
    title: "Frieren: Beyond Journey's End",
    image: "https://picsum.photos/id/500/900/1300",
    // TODO: Add a separate portrait poster if needed.
    featuredImage: "https://picsum.photos/id/500/900/1300",
    episodeImage: "https://picsum.photos/seed/1000/640/360",
    audio: "Dub | Sub",
    ageRating: "16+",
    genres: ["Action", "Adventure", "Fantasy"],
    description:
      "Frieren embarks on a new quest with a new apprentice to make peace with the nature of life and death.",
    episode: "Continue watching S1 E8",
    ratingAverage: 4.7,
    ratingCount: "34.6K"
  },

  {
    id: "full-metal-alchemist",
    title: "Full Metal Alchemist",
    image: "https://picsum.photos/id/600/900/1300",
    // TODO: Add a separate portrait poster if needed.
    featuredImage: "https://picsum.photos/id/600/900/1300",
    // TODO: Add episodeImage if included in Continue Watching.
    audio: "Dub | Sub",
    ageRating: "14+",
    genres: ["Action", "Adventure", "Supernatural"],
    description:
      "After losing his mother and almost his brother in a transmutaion accident, Elric embarks on an adventure to save his brothers physical form",
    episode: "Start Watching Episode 1",
    ratingAverage: 4.6,
    ratingCount: "47.6K"
  },

  // =========================================================
  // Trending Anime
  // =========================================================

  {
    id: "solo-leveling",
    title: "Solo Leveling",
    image: "https://picsum.photos/seed/trending-clover/300/450",
    // TODO: Add featuredImage if selected for Featured Carousel.
    // TODO: Add episodeImage if included in Continue Watching.
    audio: "Dub | Sub",
    description:
      "Sung Jinwoo, once known as the world's weakest hunter, gains the mysterious ability to level up after surviving a deadly dungeon. With his newfound powers, he sets out to uncover the secrets behind the monsters threatening humanity.",
    ratingAverage: 4.7,
    ratingCount: "65.3K"
  },

  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    image: "https://picsum.photos/seed/trending-demon/300/450",
    // TODO: Add featuredImage if selected for Featured Carousel.
    // TODO: Add episodeImage if included in Continue Watching.
    audio: "Dub | Sub",
    description:
      "Denji is a struggling young devil hunter who merges with his chainsaw devil companion, Pochita, after being betrayed. Reborn as Chainsaw Man, he joins a government organization that hunts dangerous devils.",
    ratingAverage: 4.5,
    ratingCount: "87.3K"
  },

  {
    id: "spy-x-family",
    title: "Spy x Family",
    image: "https://picsum.photos/seed/trending-jujutsu/300/450",
    // TODO: Add featuredImage if selected for Featured Carousel.
    // TODO: Add episodeImage if included in Continue Watching.
    audio: "Dub | Sub",
    description:
      "A skilled spy must create a fake family to complete a secret mission. Unaware that his new wife is an assassin and his adopted daughter can read minds, the three attempt to live together while hiding their true identities.",
    ratingAverage: 4.7,
    ratingCount: "31.4K"
  },

  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    image: "https://picsum.photos/seed/trending-attack/300/450",
    // TODO: Add featuredImage if selected for Featured Carousel.
    // TODO: Add episodeImage if included in Continue Watching.
    audio: "Dub | Sub",
    description:
      "After giant humanoid creatures known as Titans destroy his hometown, Eren Yeager joins the military to fight back. Alongside his friends, he uncovers shocking secrets about the Titans and the world beyond the walls.",
    ratingAverage: 4.4,
    ratingCount: "43.8"
  },

  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    image: "https://picsum.photos/seed/trending-hero/300/450",
    // TODO: Add featuredImage if selected for Featured Carousel.
    // TODO: Add episodeImage if included in Continue Watching.
    audio: "Dub | Sub",
    description:
      "In a world where most people possess superpowers called Quirks, Izuku Midoriya dreams of becoming a hero despite being born without one. After meeting the legendary hero All Might, he begins training at U.A. High School.",
    ratingAverage: 4.3,
    ratingCount: "38.8K"
  },

  {
    id: "one-piece",
    title: "One Piece",
    image: "https://picsum.photos/seed/trending-onepiece/300/450",
    // TODO: Add featuredImage if selected for Featured Carousel.
    // TODO: Add episodeImage if included in Continue Watching.
    audio: "Dub | Sub",
    description:
      "Monkey D. Luffy sets sail on a grand adventure to find the legendary treasure known as the One Piece and become King of the Pirates. Along the way, he gathers a loyal crew and faces powerful enemies across the seas.",
    ratingAverage: 4.9,
    ratingCount: "78.4K"
  },
];

// Finds a single anime by its unique ID.
// Returns undefined if the requested ID does not exist.
export const getAnimeById = (id: string): Anime | undefined => {
  return allAnime.find((anime) => anime.id === id);
};
