/*
 * ContinueWatchingCarousel Component
 *
 * Displays a horizontal list of episodes the user
 * has partially watched.
 *
 * Uses the same general layout approach as AnimeCarousel,
 * but renders landscape episode cards instead of posters.
 */

import {ScrollView, StyleSheet, Text, View,} from "react-native";
import ContinueWatchingCard from "./ContinueWatchingCard";

// Import the array of partially watched episodes.
// Unlike AnimeCarousel, this component retrieves its own dataset instead of receiving it through props.
import { continueWatchingAnime } from "../data/ContinueWatchingData";

const ContinueWatchingCarousel = () => {
  return (
    <View style={styles.container}>
      {/* Section title */}
      <Text style={styles.sectionTitle}>
        Continue Watching
      </Text>

      {/* Horizontally scrolling episode cards */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardRow}
      >
        {/* Create one episode card for each data object */}
        {continueWatchingAnime.map((item) => (
          <ContinueWatchingCard
            key={item.id}
            anime={item}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ContinueWatchingCarousel;

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
