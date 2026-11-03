export interface Anime {
  id: string;
  title: string;
  image: string;
  audio: string;
};

export const trendingAnime: Anime[] = [
  {
    id: "1",
    title: "Solo Leveling",
    image: "https://picsum.photos/seed/trending-clover/300/450",
    audio: "Dub | Sub",
  },
  {
    id: "2",
    title: "Chainsaw Man",
    image: "https://picsum.photos/seed/trending-demon/300/450",
    audio: "Dub | Sub",
  },
  {
    id: "3",
    title: "Spy x Family",
    image: "https://picsum.photos/seed/trending-jujutsu/300/450",
    audio: "Dub | Sub",
  },
  {
    id: "4",
    title: "Attack on Titan",
    image: "https://picsum.photos/seed/trending-attack/300/450",
    audio: "Dub | Sub",
  },
  {
    id: "5",
    title: "My Hero Academia",
    image: "https://picsum.photos/seed/trending-hero/300/450",
    audio: "Dub | Sub",
  },
  {
    id: "6",
    title: "One Piece",
    image: "https://picsum.photos/seed/trending-onepiece/300/450",
    audio: "Dub | Sub",
  },
];