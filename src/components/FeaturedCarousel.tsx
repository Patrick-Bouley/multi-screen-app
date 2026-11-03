/*FeaturedCarousel Component
 *
 * Displays the large promotional anime carousel on Home.
 *
 * Features:
 * - Shows featured anime from FeaturedData.ts.
 * - Allows users to swipe between featured shows.
 * - Automatically advances every eight seconds.
 * - Fills the active pagination indicator over seven seconds.
 * - Allows users to toggle bookmark icons.
 * - Displays anime metadata, descriptions, and watch buttons.
 *
 */

import { useState, useEffect, useRef } from "react";
import {Alert, Image, FlatList, Pressable, Text, View, Dimensions, StyleSheet,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import featuredAnime from "../data/FeaturedData";

// Get the current window width so each slide fills the screen.
// FlatList uses this width for horizontal paging and scroll calculations.
// I'll Have to change this later to be compatible on web
const screenWidth = Dimensions.get("window").width;

const FeaturedCarousel = () => {
  // Stores the index of the currently selected anime.
  // Arrays start at index 0, so the first anime is selected initially.
  const [activeIndex, setActiveIndex] = useState(0);

  // Stores the IDs of bookmarked anime in an array.
  // This begins empty because no anime have been bookmarked.
  const [bookmarkedAnime, setBookmarkedAnime] = useState<string[]>([]);

  // Holds a reference to the FlatList.
  // This allows us to scroll the carousel through code, without requiring the user to swipe manually.
  const carouselRef = useRef<FlatList>(null);

  // Stores the active progress bar's fill percentage (0 to 100).
  const [progress, setProgress] = useState(0);

  /*
   * Bookmark Handler
   *
   * Adds or removes an anime ID from the bookmarkedAnime array.
   * React state updates cause the bookmark icon to re-render.
   */
  const toggleBookmark = (id: string) => {
    // Check whether the anime is already bookmarked.
    if (bookmarkedAnime.includes(id)) {
      // Remove the matching ID by creating a new filtered array.
      setBookmarkedAnime(
        bookmarkedAnime.filter((animeId) => animeId !== id)
      );
    } else {
      // Create a new array with all existing IDs plus the new one.
      setBookmarkedAnime([...bookmarkedAnime, id]);
    }
  };

 /*
   * Carousel Timers
   *
   * This effect runs when the component first mounts and
   * whenever activeIndex changes.
   *
   * It manages two timers:
   * 1. An interval that updates the progress indicator.
   * 2. A timeout that automatically advances the carousel.
   */

useEffect(() => {
  // Reset the timer when the active anime changes.
  setProgress(0);

  // Track elapsed time for the progress bar.
  let elapsed = 0;

  // Update the progress bar every 100 milliseconds.
  const progressTimer = setInterval(() => {
    elapsed += 100;

    // Convert elapsed time into a percentage.
    // The indicator reaches 100% after 7000 milliseconds.
    // Math.min prevents the percentage from exceeding 100.
    const percentage = Math.min((elapsed / 7000) * 100, 100);

    setProgress(percentage);
  }, 100);

  // Automatically switch to the next featured anime after 8 seconds.
  const carouselTimer = setTimeout(() => {
    // Move to the next index.
    // % returns to index 0 after reaching the last anime.
    const nextIndex = (activeIndex + 1) % featuredAnime.length;

    // Use our FlatList reference to scroll to the next anime.
    // Optional chaining prevents an error if the ref is unavailable.
    carouselRef.current?.scrollToIndex({
      index: nextIndex,
      animated: true,
    });

    // Update React state so the active indicator also changes.
    setActiveIndex(nextIndex);
  }, 8000);

  // Cleanup runs before this effect starts again,
  // and when the component is removed from the screen.
  // This prevents old timers from continuing to run.
  return () => {
    clearInterval(progressTimer);
    clearTimeout(carouselTimer);
  };
}, [activeIndex]);

  return (
    <View>
      {/* Featured anime carousel */}
      <FlatList
        // Connect the FlatList to our carouselRef.
        ref={carouselRef}
        // Array containing the anime to display.
        data={featuredAnime}
        // Scroll from left to right instead of vertically.
        horizontal={true}
        // Hide the horizontal scrollbar.
        showsHorizontalScrollIndicator={false}
        // Snap each swipe to one full slide.
        pagingEnabled={true}
        // Give each slide a stable identifier.
        keyExtractor={(item) => item.id}
        // Runs when a swipe finishes moving.
        onMomentumScrollEnd={(event) => {
            // Read how far the list has moved horizontally.
            const offset = event.nativeEvent.contentOffset.x;
            // Divide by slide width to determine the selected index.
            // Round to the nearest whole slide.
            const index = Math.round(offset / screenWidth);

            // Only update state if the selected anime has changed.
            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        }}
        // FlatList calls renderItem for each anime object.
        // item represents the current anime being rendered.
        renderItem={({ item }) => (
          <View style={styles.featuredContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.featuredImage}/>
            {/* Information displayed over the bottom of the image */}
            <View style={styles.featuredInformation}>
                {/* Anime title */}
                <Text style={styles.animeTitle}>
                    {item.title}
                </Text>

                {/* Age rating, audio, and genres */}
                <View style={styles.animeMetadata}>
                    <Text style={styles.ageRating}>{item.ageRating}</Text>
                    <Text style={styles.separator}>  ◆  </Text>
                    <Text style={styles.metadataText}>{item.audio}</Text>
                    <Text style={styles.separator}>  ◆  </Text>
                    <Text style={styles.metadataText}>{item.genres.join(", ")}</Text>
                </View>

                {/* Anime description */}
                <Text style={styles.description}>
                    {item.description}
                </Text>

              <View style={styles.buttonRow}>
                {/* Continue watching button */}
                <Pressable
                  style={styles.watchButton}
                  onPress={() =>
                    Alert.alert("Continue watching", item.episode)
                  }
                >
                  <Ionicons
                    name="play-outline"
                    size={28}
                    color="#000"
                  />

                  <Text style={styles.watchText}>
                    {item.episode}
                  </Text>
                </Pressable>

                {/* Bookmark button */}
                <Pressable
                  style={styles.listButton}
                  onPress={() => toggleBookmark(item.id)}
                >
                  <Ionicons
                    name={
                      // Choose the icon based on bookmark state.
                      bookmarkedAnime.includes(item.id)
                        ? "bookmark-sharp"
                        : "bookmark-outline"
                    }
                    size={28}
                    color="#FF640A"
                  />
                </Pressable>
              </View>
            </View>
          </View>
        )}
      />

      {/* Pagination indicators displayed beneath the carousel */}
      <View style={styles.indicators}>
        {featuredAnime.map((anime, index) => (
            <View key={anime.id} style={styles.indicator}>
            {/* Only the active indicator contains a progress fill. */}
            {activeIndex === index && (
                <View
                style={[
                    styles.indicatorFill,
                    // Convert the numeric progress value into a
                    // percentage-based width for the fill.
                    { width: `${progress}%` },
                ]}
                />
            )}
            </View>
        ))}
        </View>
    </View>
  );
};

export default FeaturedCarousel;

const styles = StyleSheet.create({
    featuredContainer: {
      // Each featured slide fills the screen's available width. keep in mind if i need to change this for web
        width: screenWidth,
        height: 580,
        // Allows the information overlay to be positioned relative to this slide.
        position: "relative",
        // Hide anything extending beyond the slide boundaries.
        overflow: "hidden",
    },
    featuredImage: {
        width: "100%",
        height: "100%",
    },
    featuredInformation: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 16,
        paddingBottom: 20,
        // Semi-transparent black background for readable text.
        // The final value (0.50) controls background opacity.
        backgroundColor: "rgba(0, 0, 0, 0.50)",
    },
    animeTitle: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 10,
    },
    description: {
        fontSize: 12,
        color: "#fff",
        marginBottom: 20,
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
        paddingVertical: 14,
        borderRadius: 30,
    },
    watchText: {
        color: "#000",
        fontWeight: "bold",
        fontSize: 15,
    },
    listButton: {
        borderColor: "#ff640a",
        borderWidth: 2,
        borderRadius: 30,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    indicators: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 8,
        paddingVertical: 18,
        paddingHorizontal: 16,
    },
    indicator: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#aaa",
    },
    indicatorFill: {
        height: "100%",
        backgroundColor: "#ff640a",
    },
    animeMetadata: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
        gap: 4,
    },
    ageRating: {
        backgroundColor: "#404044",
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold",
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 2,
        overflow: "hidden",
    },
    metadataText: {
        color: "#fff",
        fontSize: 12,
        flexShrink: 1,
    },
    separator: {
        color: "#fff",
        fontSize: 8,
        textAlign: "center",
        includeFontPadding: false,
    },
});
