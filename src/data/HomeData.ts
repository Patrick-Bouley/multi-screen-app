export interface FeaturedAnime {
  id: string;
  title: string;
  description: string;
  episode: string;
  image: string;
}

const featuredAnime: FeaturedAnime[] = [
    {
        id: "1",
        title: "Black Clover",
        description: "Asta and Yuno dream of becoming the Wizard King, but they are born without magic in a world where magic is everything.",
        episode: "Continue watching S2 E15",
        image: "https://picsum.photos/seed/clover/900/1300"
    },
    {
        id: "2",
        title: "Demon Slayer",
        description: "Tanjiro Kamado joins the Demon Slayer Corps to find a cure for his sister and avenge his family.",
        episode: "Continue watching S2 E10",
        image: "https://picsum.photos/seed/demon/900/1300"
    },
    {
        id: "3",
        title: "Jujutsu Kaisen",
        description: "Yuji Itadori joins a secret organization to fight curses and protect humanity.",
        episode: "Continue watching S1 E20",
        image: "https://picsum.photos/seed/jujutsu/900/1300"
    },
];

export default featuredAnime;