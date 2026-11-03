/*
 * AnimeCarousel Component
 *
 * Creates a horizontally scrolling section of anime cards.
 *
 * Receives a section title and an array of anime through
 * props. It then creates an AnimeCard for each anime.
 *
 * Reusable for sections such as Trending in Canada and
 * October 2026 Simulcasts.
 *
 * Unlike FeaturedCarousel, this carousel only scrolls
 * when the user swipes. It does not rotate automatically.
 */

import {ScrollView, StyleSheet, Text, View,} from "react-native";
import AnimeCard from "./AnimeCard";
import type { Anime } from "../data/TrendingData";

// Information the carousel expects from its parent screen.
interface AnimeCarouselProps {
    title: string;
    anime: Anime[];
}

const AnimeCarousel = ({ title, anime }: AnimeCarouselProps) => {
  return (
    <View style={styles.container}>
      {/* Section heading */}
      <Text style={styles.sectionTitle}>{title}</Text>

      {/* Horizontal row of anime posters */}
      <ScrollView
        // This changes the scrolling to be Horizontal instead of vertical
        horizontal
        // Hide the scrollbar to match Crunchyroll's interface.
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardRow}>
        {/* Loop through the anime array and create one card per anime. */}
        {anime.map((item) => (
          <AnimeCard
            key={item.id}
            anime={item}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default AnimeCarousel;

const styles = StyleSheet.create({
    container: {
        marginTop: 12,
        marginBottom: 20,
    },
    sectionTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 16,
        marginBottom: 16,
    },
    cardRow: {
        paddingHorizontal: 16,
        gap: 12,
    },
});
