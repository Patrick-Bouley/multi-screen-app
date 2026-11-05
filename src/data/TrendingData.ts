/*
 * Trending Anime Data
 *
 * Stores the anime used in the "Trending in Canada" section.
 *
 * Each anime has only the information required by AnimeCard.
 */

export interface Anime {
  id: string;
  title: string;
  image: string;
  audio: string;
}

// Array containing the anime displayed in Trending in Canada.
// AnimeCarousel will loop through these objects and render one AnimeCard for each show.
export const trendingAnime: Anime[] = [
  {
    id: "solo-leveling",
    title: "Solo Leveling",
    image: "https://picsum.photos/seed/trending-clover/300/450",
    audio: "Dub | Sub",
  },
  {
    id: "chainsaw-man",
    title: "Chainsaw Man",
    image: "https://picsum.photos/seed/trending-demon/300/450",
    audio: "Dub | Sub",
  },
  {
    id: "spy-x-family",
    title: "Spy x Family",
    image: "https://picsum.photos/seed/trending-jujutsu/300/450",
    audio: "Dub | Sub",
  },
  {
    id: "attack-on-titan",
    title: "Attack on Titan",
    image: "https://picsum.photos/seed/trending-attack/300/450",
    audio: "Dub | Sub",
  },
  {
    id: "my-hero-academia",
    title: "My Hero Academia",
    image: "https://picsum.photos/seed/trending-hero/300/450",
    audio: "Dub | Sub",
  },
  {
    id: "one-piece",
    title: "One Piece",
    image: "https://picsum.photos/seed/trending-onepiece/300/450",
    audio: "Dub | Sub",
  },
];
