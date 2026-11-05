/*
 * ContinueWatchingCard Component
 *
 * Displays a single episode in the Continue Watching section.
 *
 * Each card shows a landscape image, play icon,
 * watch-progress bar, anime title, episode number,
 * and the amount of time remaining in the episode.
 *
 * The episode information is displayed over the image
 * rather than underneath it, matching Crunchyroll's layout.
 *
 * The play button currently uses a temporary alert.
 */

import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { ContinueWatchingAnime } from "../data/ContinueWatchingData";

// Each card receives one ContinueWatchingAnime object.
interface ContinueWatchingCardProps {
  anime: ContinueWatchingAnime;
}

const ContinueWatchingCard = ({ anime }: ContinueWatchingCardProps) => {
  return (
    <View style={styles.card}>
      {/* Entire episode image is pressable */}
      <Pressable
        style={styles.imageContainer}
        onPress={() =>
          Alert.alert("Continue Watching", anime.title)
        }>
        {/* Episode thumbnail */}
        <Image
          source={{ uri: anime.image }}
          style={styles.image}/>
        {/* Information displayed over the bottom of the thumbnail */}
        <View style={styles.informationOverlay}>
          {/* Play icon positioned to the left of the episode information */}
          <View style={styles.playIcon}>
            <Ionicons
              name="play"
              size={30}
              color="#FFFFFF"/>
          </View>
          {/* Anime title and episode number */}
          <View style={styles.episodeInformation}>
            <Text
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode="tail">
              {anime.title}
            </Text>

            <Text
              style={styles.episode}
              numberOfLines={1}>
              {anime.episode}
            </Text>
          </View>

          {/* Remaining watch time displayed on the right */}
          <Text style={styles.timeLeft}>
            {anime.timeLeft}
          </Text>
        </View>

        {/* Episode watch-progress bar */}
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              // Convert the numeric progress value into a percentage.
              { width: `${anime.progress}%` },
            ]}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default ContinueWatchingCard;

const styles = StyleSheet.create({
  card: {
    width: 360,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  informationOverlay: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  playIcon: {
    width: 50,
    height: 50,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.40)",
    alignItems: "center",
    justifyContent: "center",
  },
  episodeInformation: {
    flex: 1,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  episode: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 4,
  },
  timeLeft: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  progressBackground: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 4,
    backgroundColor: "#777777",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF640A",
  },
});
