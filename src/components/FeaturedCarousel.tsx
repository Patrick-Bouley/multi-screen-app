
import { useState, useEffect, useRef } from "react";
import {Alert, Image, FlatList, Pressable, Text, View, Dimensions, StyleSheet,} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import featuredAnime from "../data/HomeData";

// Temporary width used to avoid the Expo Web hydration issue.
const screenWidth = Dimensions.get("window").width;

const FeaturedCarousel = () => {
  // Track which anime is currently visible.
  const [activeIndex, setActiveIndex] = useState(0);

  // Store the IDs of bookmarked anime.
  const [bookmarkedAnime, setBookmarkedAnime] = useState<string[]>([]);

  // This will tell the component it can scroll on its own, instead of waiting for someone to swipe
  const carouselRef = useRef<FlatList>(null);
  const [progress, setProgress] = useState(0);

  // Add or remove an anime from bookmarks.
  const toggleBookmark = (id: string) => {
    if (bookmarkedAnime.includes(id)) {
      setBookmarkedAnime(
        bookmarkedAnime.filter((animeId) => animeId !== id)
      );
    } else {
      setBookmarkedAnime([...bookmarkedAnime, id]);
    }
  };


useEffect(() => {
  // Reset the timer when the active anime changes.
  setProgress(0);

  // Track elapsed time for the progress bar.
  let elapsed = 0;

  // Update the progress bar every 100 milliseconds.
  const progressTimer = setInterval(() => {
    elapsed += 100;

    // Fill the bar over 7 seconds, stopping at 100%.
    const percentage = Math.min((elapsed / 7000) * 100, 100);

    setProgress(percentage);
  }, 100);

  // Automatically advance after 8 seconds.
  const carouselTimer = setTimeout(() => {
    const nextIndex = (activeIndex + 1) % featuredAnime.length;

    carouselRef.current?.scrollToIndex({
      index: nextIndex,
      animated: true,
    });

    setActiveIndex(nextIndex);
  }, 8000);

  // Clean up the old timers.
  return () => {
    clearInterval(progressTimer);
    clearTimeout(carouselTimer);
  };
}, [activeIndex]);


  return (
    <View>
      {/* Featured anime carousel */}
      <FlatList
        ref={carouselRef}
        data={featuredAnime}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
            const offset = event.nativeEvent.contentOffset.x;
            const index = Math.round(offset / screenWidth);

            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        }}
        renderItem={({ item }) => (
          <View style={styles.featuredContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.featuredImage}/>
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

      {/* Carousel pagination indicators */}
      <View style={styles.indicators}>
        {featuredAnime.map((anime, index) => (
            <View key={anime.id} style={styles.indicator}>
            {activeIndex === index && (
                <View
                style={[
                    styles.indicatorFill,
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
        width: screenWidth,
        height: 580,
        position: "relative",
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
        backgroundColor: "rgba(0, 0, 0, 0.75)",
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
        justifyContent: "center",
        gap: 8,
        paddingVertical: 18,
    },
    indicator: {
        width: 30,
        height: 6,
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
