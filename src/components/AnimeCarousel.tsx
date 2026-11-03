
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
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardRow}>
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
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 16,
        marginBottom: 16,
    },
    cardRow: {
        paddingHorizontal: 16,
        gap: 12,
    },
});
