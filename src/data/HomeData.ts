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

const featuredAnime: FeaturedAnime[] = [
    {
        id: "1",
        title: "Black Clover",
        ageRating: "14+",
        audio: "Dub | Sub",
        genres: ["Action", "Adventure", "Fantasy", "Shounen"],
        description: "Asta and Yuno dream of becoming the Wizard King, but they are born without magic in a world where magic is everything.",
        episode: "Continue watching S2 E15",
        image: "https://picsum.photos/id/184/900/1300"
    },
    {
        id: "2",
        title: "Demon Slayer",
        ageRating: "16+",
        audio: "Dub | Sub",
        genres: ["Action", "Adventure", "Fantasy",],
        description: "Tanjiro Kamado joins the Demon Slayer Corps to find a cure for his sister and avenge his family.",
        episode: "Continue watching S2 E10",
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
        image: "https://picsum.photos/id/310/900/1300"
    },
];

export default featuredAnime;