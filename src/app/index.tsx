import { Alert, Image, FlatList, Pressable, ScrollView, Text, View, StyleSheet, Dimensions, } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

import featuredAnime from "../data/HomeData";

const screenWidth = 400;

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [bookmarkedAnime, setBookmarkedAnime] = useState<string[]>([]);

const toggleBookmark = (id: string) => {
  if (bookmarkedAnime.includes(id)) {
    setBookmarkedAnime(bookmarkedAnime.filter((animeId) => animeId !== id));
  } else {
    setBookmarkedAnime([...bookmarkedAnime, id]);
  }
};

  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={featuredAnime}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          keyExtractor={(item) => item.id}
          onMomentumScrollEnd={(event) => {
            const offset = event.nativeEvent.contentOffset.x;
            const index = Math.round(offset/screenWidth);
            setActiveIndex(index);
          }}
          renderItem={({ item }) => (
            <View style={styles.featuredContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.featuredImage}
              />
              <View style={styles.featuredInformation}>
                <Text style={styles.animeTitle}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.buttonRow}>
                  <Pressable style={styles.watchButton}
                    onPress={() => Alert.alert("Continue watching", item.episode)}
                  >
                    <Ionicons name="play-outline" size={28} color="#000" />
                    <Text style={styles.watchText}>{item.episode}</Text>
                  </Pressable>
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
        <Text style={styles.sectionTitle}>
          Trending in Canada
        </Text>
      </ScrollView>
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
  },
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
  listText: {
    color: "#ff640a",
    fontSize: 30,
    paddingBottom: 4,
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
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 20,
  },
});
