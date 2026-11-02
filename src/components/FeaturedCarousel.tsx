
import { useState } from "react";
import {
  Alert,
  Image,
  FlatList,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import featuredAnime from "../data/HomeData";

// Temporary width used to avoid the Expo Web hydration issue.
const screenWidth = 400;

const FeaturedCarousel = () => {
  // Track which anime is currently visible.
  const [activeIndex, setActiveIndex] = useState(0);

  // Store the IDs of bookmarked anime.
  const [bookmarkedAnime, setBookmarkedAnime] = useState<string[]>([]);

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

  return (
    <View>
      {/* Featured anime carousel */}
      <FlatList
        data={featuredAnime}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled={true}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(event) => {
          const offset = event.nativeEvent.contentOffset.x;
          const index = Math.round(offset / screenWidth);
          setActiveIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={styles.featuredContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.featuredImage}
            />

            <View style={styles.featuredInformation}>
              <Text style={styles.animeTitle}>
                {item.title}
              </Text>

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
          <View
            key={anime.id}
            style={[
              styles.indicator,
              activeIndex === index && styles.activeIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default FeaturedCarousel;

const styles = StyleSheet.create({
  featuredContainer: {
    width: screenWidth,
    height: 650,
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
    marginBottom: 12,
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

  activeIndicator: {
    backgroundColor: "#ff640a",
  },
});
