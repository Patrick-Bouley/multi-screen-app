/*
 * Featured Anime Data
 *
 * Stores the anime information used by FeaturedCarousel.
 *
 * Keeping this information separate from the UI makes
 * the carousel easier to maintain and reuse.
 *
 * The images are currently Picsum placeholders rather
 * than actual anime promotional artwork.
 */

export interface FeaturedAnime {
  id: string;
  title: string;
  ageRating: string;
  audio: string;
  genres: string[];
  description: string;
  episode: string;
  image: string;
}

// An array of featured anime objects.
// Each object must match the FeaturedAnime interface.
// FeaturedCarousel uses this array to build its slides.
// Adding another valid object creates another featured item.

const featuredAnime: FeaturedAnime[] = [
    {
        id: "1",
        title: "Black Clover",
        ageRating: "14+",
        audio: "Dub | Sub",
        genres: ["Action", "Adventure", "Fantasy", "Shounen"],
        description: "Asta and Yuno dream of becoming the Wizard King, but they are born without magic in a world where magic is everything.",
        episode: "Continue Watching S2 E15",
        image: "https://picsum.photos/id/184/900/1300"
    },
    {
        id: "2",
        title: "Demon Slayer",
        ageRating: "16+",
        audio: "Dub | Sub",
        genres: ["Action", "Adventure", "Fantasy",],
        description: "Tanjiro Kamado joins the Demon Slayer Corps to find a cure for his sister and avenge his family.",
        episode: "Continue Watching S2 E10",
        image: "https://picsum.photos/id/239/900/1300"
    },
    {
        id: "3",
        title: "Jujutsu Kaisen",
        ageRating: "16+",
        audio: "Dub | Sub",
        genres: ["Action", "Fantasy", "Supernatural"],
        description: "Yuji Itadori joins a secret organization to fight curses and protect humanity.",
        episode: "Start Watching Episode 1",
        image: "https://picsum.photos/id/314/900/1300"
    },
    {
        id: "4",
        title: "Soul Eater",
        ageRating: "14+",
        audio: "Dub | Sub",
        genres: ["Action", "Adventure", "Supernatural"],
        description: "Maka Albarn and her weapon partner, Soul Eater, attend the Death Weapon Meister Academy to become skilled fighters against evil souls.",
        episode: "Start Watching Episode 1",
        image: "https://picsum.photos/id/400/900/1300"
    },
    {
        id: "5",
        title: "Frieren: Beyond Journey's End",
        ageRating: "16+",
        audio: "Dub | Sub",
        genres: ["Action", "Adventure", "Fantasy"],
        description: "Frieren embarks on a new quest with a new apprentice to make peace with the nature of life and death.",
        episode: "Continue watching S1 E8",
        image: "https://picsum.photos/id/500/900/1300"
    },
    {
        id: "6",
        title: "Full Metal Alchemist",
        ageRating: "14+",
        audio: "Dub | Sub",
        genres: ["Action", "Adventure", "Supernatural"],
        description: "After losing his mother and almost his brother in a transmutaion accident, Elric embarks on an adventure to save his brothers physical form",
        episode: "Start Watching Episode 1",
        image: "https://picsum.photos/id/600/900/1300",
    },
];

export default featuredAnime;