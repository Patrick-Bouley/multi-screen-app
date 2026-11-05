/*
 * Anime Details Screen
 *
 * Displays information about whichever anime the user selected.
 *
 * Expo Router passes the anime ID through the [id] route.
 * The ID is used to look up the anime in our shared catalogue.
 *
 * This screen also uses FavouritesContext to add or remove
 * anime from the same Watchlist used by Home and My Lists.
 */
import { useState } from "react";
import {Alert, Image, Pressable, ScrollView, Share, StyleSheet, Text, View,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAnimeById } from "../../data/AnimeData";
import { useFavourites } from "../../context/FavouritesContext";

const AnimeDetails = () => {
  // Read the anime ID from the route.
  const { id } = useLocalSearchParams<{ id: string }>();

  // Look up the selected anime in our master catalogue.
  const anime = getAnimeById(id ?? "");

  // Shared Watchlist state.
  const { favourites, toggleFavourite } = useFavourites();

  // Controls whether the full description is visible.
  const [showMore, setShowMore] = useState(false);

  // Handle an ID that doesn't exist in our catalogue.
  if (!anime) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Return to the previous screen in the navigation stack */}
        <Pressable
          style={styles.backButton}
          hitSlop={10}
          onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={26}
            color="#FFFFFF"/>
        </Pressable>

        <View style={styles.notFound}>
          <Text style={styles.title}>Anime Not Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Check whether the selected anime is already saved.
  const isSaved = favourites.includes(anime.id);

  // Open the phone's native sharing menu.
  const shareAnime = async () => {
    try {
      await Share.share({
        message: `Check out ${anime.title}!`,
      });
    } catch {
      Alert.alert("Share", "Unable to share this anime.");
    }
  };

  // Options menu reuses the same shared Watchlist.
  const showOptions = () => {
    Alert.alert(anime.title, "Choose an option", [
      {text: isSaved
          ? "Remove from Watchlist"
          : "Add to Watchlist",
        onPress: () => toggleFavourite(anime.id),
      },
      { text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Large promotional image and overlaid top navigation */}
        <View style={styles.heroContainer}>
          <Image
            source={{
              uri: anime.featuredImage ?? anime.image,
            }}
            style={styles.heroImage}/>

          <View style={styles.topNavigation}>
            <Pressable
              style={styles.backButton}
              hitSlop={10}
              onPress={() => router.back()}>
            <Ionicons
              name="arrow-back"
              size={26}
              color="#FFFFFF"/>
            </Pressable>

            <View style={styles.topButtons}>
              <Pressable
                hitSlop={10}
                onPress={() =>
                  Alert.alert("Cast", "Cast selected")}>
                <Ionicons
                  name="tv-outline"
                  size={26}
                  color="#FFFFFF"/>
              </Pressable>

              <Pressable hitSlop={10} onPress={showOptions}>
                <Ionicons
                  name="ellipsis-vertical"
                  size={25}
                  color="#FFFFFF"/>
              </Pressable>
            </View>
          </View>
        </View>
        {/* Selected anime details */}
        <View style={styles.information}>
          <Text style={styles.title}>{anime.title}</Text>

          {/* Age rating, audio and genres */}
          <View style={styles.metadataRow}>
            {anime.ageRating && (
              <Text style={styles.ageRating}>{anime.ageRating}</Text>
            )}

            <Text style={styles.metadataText}>{anime.audio}</Text>

            {anime.genres && anime.genres.length > 0 && (
              <Text style={styles.metadataText}>• {anime.genres.join(", ")}</Text>
            )}
          </View>

          {/* Only show a rating when the data exists. */}
          {anime.ratingAverage !== undefined && (
            <View style={styles.ratingRow}>
              <Text style={styles.stars}>★★★★★</Text>

              <Text style={styles.ratingText}>
                Average: {anime.ratingAverage}
                {anime.ratingCount
                  ? ` (${anime.ratingCount})`
                  : ""}</Text>

              <Ionicons
                name="chevron-down"
                size={16}
                color="#FFFFFF"/>
            </View>
          )}

          {/* My List and Share actions */}
          <View style={styles.actionRow}>
            <Pressable
              style={styles.actionButton}
              onPress={() => toggleFavourite(anime.id)}>
              <Ionicons
                name={isSaved ? "checkmark" : "add"}
                size={28}
                color="#FF640A"/>

              <Text style={styles.actionText}>My List</Text>
            </Pressable>

            <Pressable
              style={styles.actionButton}
              onPress={shareAnime}>
              <Ionicons
                name="share-social-outline"
                size={25}
                color="#FF640A"/>

              <Text style={styles.actionText}>Share</Text>
            </Pressable>
          </View>

          {/* Description preview. Expands when More Details is tapped. */}
          <Text
            style={styles.description}
            numberOfLines={showMore ? undefined : 3}>
            {anime.description ??
              "More information about this anime is coming soon."}
          </Text>

          <Pressable
            style={styles.moreDetailsButton}
            onPress={() => setShowMore(!showMore)}>
            <Text style={styles.moreDetailsText}>
              {showMore ? "Show Less" : "More Details"}
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Watch controls stay visible at the bottom of the screen. */}
      <View style={styles.bottomControls}>
        <Pressable
          style={styles.watchButton}
          onPress={() =>
            Alert.alert(
              "Watch Anime",
              anime.episode ?? "Start Watching E1"
            )} >
          <Ionicons
            name="play-outline"
            size={26}
            color="#000000"/>

          <Text style={styles.watchText} numberOfLines={1}>
            {anime.episode ?? "Start Watching E1"}
          </Text>
        </Pressable>

        <Pressable
          style={styles.bookmarkButton}
          onPress={() => toggleFavourite(anime.id)}>
          <Ionicons
            name={isSaved ? "bookmark" : "bookmark-outline"}
            size={26}
            color="#FF640A"/>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AnimeDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  heroContainer: {
    height: 430,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  topNavigation: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  topButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 26,
  },
  closeButton: {
    margin: 16,
  },
  information: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 14,
    textAlign: "center"
  },
  metadataRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 7,
    marginBottom: 14,
  },
  ageRating: {
    color: "#FFFFFF",
    backgroundColor: "#404044",
    justifyContent: "center",
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontSize: 12,
    fontWeight: "bold",
  },
  metadataText: {
    color: "#FFFFFF",
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginBottom: 18,
  },
  stars: {
    color: "#FFFFFF",
    fontSize: 17,
    letterSpacing: 1,
  },
  ratingText: {
    color: "#FFFFFF",
    fontSize: 13,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 36,
    marginVertical: 18,
  },
  actionButton: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
    gap: 5,
  },
  actionText: {
    color: "#FF640A",
    fontSize: 12,
    textAlign: "center"
  },
  description: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12,
    textAlign: "center"
  },
  moreDetailsButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  moreDetailsText: {
    color: "#FF640A",
    fontSize: 13,
    fontWeight: "bold",
  },
  bottomControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#000000",
  },
  watchButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FF640A",
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  watchText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
    flexShrink: 1,
  },
  bookmarkButton: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: "#FF640A",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});