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
        title: "Friern: Beyond Journey's End",
        ageRating: "16+",
        audio: "Dub | Sub",
        genres: ["Action", "Adventure", "Fantasy"],
        description: "A group of adventurers embarks on a journey to find a legendary artifact.",
        episode: "Continue watching S1 E8",
        image: "https://picsum.photos/id/500/900/1300"
    }
];

export default featuredAnime;