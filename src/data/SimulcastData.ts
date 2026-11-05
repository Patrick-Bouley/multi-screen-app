/*
 * Simulcast Data
 *
 * Selects anime from the main catalogue for the
 * Simulcasts sections on Home and Browse.
 * 
 * I decided to make this to remove the list from those 
 * screens mentioned. Keeps the files a little more clea 
 * 
 * all this data is in the main AnimeData already
 */

import { allAnime } from "./AnimeData";

// IDs of anime included in the Simulcasts category.
const simulcastIds = [
  "dan-da-dan",
  "blue-lock",
  "kaiju-no-8",
  "wind-breaker",
  "fire-force",
  "dr-stone",
];

// Find the matching anime in the main catalogue.
export const simulcastAnime = allAnime.filter((anime) =>
  simulcastIds.includes(anime.id),
);