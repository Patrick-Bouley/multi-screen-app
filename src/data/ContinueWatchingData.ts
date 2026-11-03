/*
 * Continue Watching Data
 *
 * Stores sample information about episodes the user has partially watched.
 *
 * Each object follows the ContinueWatchingAnime interface,
 * ensuring every episode contains the information required by the ContinueWatchingCard component.
 *
 * Progress values are placeholders, not actual saved viewing history.
 */

// Define the information required by each episode card.
export interface ContinueWatchingAnime {
  id: string;
  title: string;
  episode: string;
  image: string;
  progress: number;
  timeLeft: string;
}

// Example episodes with different completion percentages.
export const continueWatchingAnime: ContinueWatchingAnime[] = [
  {
    id: "1",
    title: "Black Clover",
    episode: "S2 E15",
    image: "https://picsum.photos/seed/801/640/360",
    progress: 70,
    timeLeft: "8m left",
  },
  {
    id: "2",
    title: "Demon Slayer",
    episode: "S2 E10",
    image: "https://picsum.photos/seed/900/640/360",
    progress: 35,
    timeLeft: "18m left",
  },
  {
    id: "3",
    title: "Frieren: Beyond Journey's End",
    episode: "S1 E8",
    image: "https://picsum.photos/seed/1000/640/360",
    progress: 85,
    timeLeft: "6m left",
  },
  {
    id: "4",
    title: "Soul Eater",
    episode: "S1 E8",
    image: "https://picsum.photos/seed/1100/640/360",
    progress: 20,
    timeLeft: "22m left",
  },
];
