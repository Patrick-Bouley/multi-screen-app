/*
 * AnimeCard Component
 *
 * Displays one anime poster in a horizontal carousel.
 *
 * Uses Expo Router to open the Anime Details screen.
 * Uses FavouritesContext so the options menu can
 * add or remove anime from the shared Watchlist.
 */
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import type { Anime } from "../data/TrendingData";
import { useFavourites } from "../context/FavouritesContext";

interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  // Read shared bookmark state from our existing Context.
  const { favourites, toggleFavourite } = useFavourites();

  // Derived value: true when this anime is already saved.
  const isSaved = favourites.includes(anime.id);

  // Open the Details screen for the selected anime.
  const openDetails = () => {
    router.push({
      pathname: "/anime/[id]",
      params: { id: anime.id },
    });
  };

  // Build an options menu based on the anime's saved status.
  const showOptions = () => {
    Alert.alert(anime.title, "Choose an option", [
      {
        text: isSaved ? "Remove from Watchlist" : "Add to Watchlist",

        // Reuse the same toggle function as FeaturedCarousel.
        onPress: () => toggleFavourite(anime.id),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  return (
    <View style={styles.card}>
      {/* Tapping the poster opens its Details screen. */}
      <Pressable onPress={openDetails}>
        <Image source={{ uri: anime.image }} style={styles.poster} />
      </Pressable>

      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
        {anime.title}
      </Text>

      <View style={styles.audioRow}>
        <Text style={styles.audio}>{anime.audio}</Text>

        {/* Options now interact with the shared Watchlist. */}
        <Pressable hitSlop={10} onPress={showOptions}>
          <Ionicons name="ellipsis-vertical" size={18} color="#7d7d7d" />
        </Pressable>
      </View>
    </View>
  );
};

export default AnimeCard;

const styles = StyleSheet.create({
  card: {
    width: 157,
  },
  poster: {
    width: 160,
    height: 240,
    resizeMode: "cover",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 8,
  },
  audioRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  audio: {
    color: "#7d7d7d",
    fontSize: 12,
  },
});
