/*
 * Anime Details Screen
 *
 * Uses the dynamic [id] route provided by Expo Router.
 *
 * Reads the selected anime ID from the URL, retrieves
 * the corresponding object from the shared catalogue,
 * and displays its details.
 *
 * Also allows users to bookmark or unbookmark anime.
 */

import {Alert, Image, Pressable, ScrollView, StyleSheet, Text, View,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAnimeById } from "../../data/AnimeData";
import { useFavourites } from "../../context/FavouritesContext";

const AnimeDetails = () => {
  // Read the ID from a route such as /anime/black-clover.
  const { id } = useLocalSearchParams<{ id: string }>();

  // Retrieve the anime using our existing helper function.
  const anime = getAnimeById(id ?? "");

  const { favourites, toggleFavourite } = useFavourites();

  // Check the result before accessing the anime properties.
  if (!anime) {
    return (
      <SafeAreaView style={styles.container}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#FFFFFF"
          />
        </Pressable>

        <View style={styles.notFound}>
          <Text style={styles.title}>Anime Not Found</Text>
          <Text style={styles.description}>
            The selected anime could not be found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const isSaved = favourites.includes(anime.id);

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
    >
      <ScrollView>
        {/* Promotional image */}
        <Image
          source={{
            uri: anime.featuredImage ?? anime.image,
          }}
          style={styles.heroImage}
        />

        {/* Custom back button because root Stack hides headers. */}
        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={28}
            color="#FFFFFF"
          />
        </Pressable>

        <View style={styles.information}>
          <Text style={styles.title}>
            {anime.title}
          </Text>

          <View style={styles.metadata}>
            {anime.ageRating && (
              <Text style={styles.rating}>
                {anime.ageRating}
              </Text>
            )}

            <Text style={styles.audio}>
              {anime.audio}
            </Text>
          </View>

          {/* Some catalogue entries do not have genres. */}
          {anime.genres && (
            <Text style={styles.genres}>
              {anime.genres.join(", ")}
            </Text>
          )}

          <Text style={styles.description}>
            {anime.description ??
              "More information about this anime is coming soon."}
          </Text>

          <View style={styles.buttonRow}>
            <Pressable
              style={styles.watchButton}
              onPress={() =>
                Alert.alert(
                  "Watch Anime",
                  anime.episode ?? "Start Watching E1"
                )
              }
            >
              <Ionicons
                name="play"
                size={24}
                color="#000000"
              />

              <Text
                style={styles.watchText}
                numberOfLines={1}
              >
                {anime.episode ?? "Start Watching E1"}
              </Text>
            </Pressable>

            <Pressable
              style={styles.bookmarkButton}
              onPress={() => toggleFavourite(anime.id)}
            >
              <Ionicons
                name={
                  isSaved
                    ? "bookmark"
                    : "bookmark-outline"
                }
                size={26}
                color="#FF640A"
              />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AnimeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  heroImage: {
    width: "100%",
    height: 380,
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  information: {
    padding: 16,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 14,
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  rating: {
    color: "#FFFFFF",
    backgroundColor: "#404044",
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontWeight: "bold",
  },
  audio: {
    color: "#CCCCCC",
    fontSize: 14,
  },
  genres: {
    color: "#CCCCCC",
    fontSize: 14,
    marginBottom: 16,
  },
  description: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  watchButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FF640A",
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  watchText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 14,
    flexShrink: 1,
  },
  bookmarkButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: "#FF640A",
    alignItems: "center",
    justifyContent: "center",
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
});