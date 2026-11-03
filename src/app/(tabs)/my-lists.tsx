
/*
 * My Lists Screen
 *
 * Displays anime bookmarked from Home or Browse.
 *
 * The Favourites Context stores bookmarked IDs.
 * We use these IDs to find their matching objects
 * in the shared AnimeData catalogue.
 *
 * Users can remove bookmarks directly from My Lists.
 */

import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import Header from "../../components/Header";
import { allAnime } from "../../data/AnimeData";
import { useFavourites } from "../../context/FavouritesContext";

const MyLists = () => {
  // Access the same bookmarks used by Home and Browse.
  const { favourites, toggleFavourite } = useFavourites();

  // Find the complete anime objects matching our saved IDs.
  // We don't need another useState because this can be
  // calculated whenever the shared favourites change.
  const savedAnime = allAnime.filter((anime) =>
    favourites.includes(anime.id)
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header title="My Lists" />

      <FlatList
        data={savedAnime}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContent}

        // Appears above the saved anime.
        ListHeaderComponent={
          <Text style={styles.sectionTitle}>
            Watchlist
          </Text>
        }

        // Shown when the saved anime array is empty.
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="bookmark-outline"
              size={54}
              color="#999999"
            />

            <Text style={styles.emptyTitle}>
              Your Watchlist is Empty
            </Text>

            <Text style={styles.emptyDescription}>
              Bookmark anime from Home or Browse
              to add them to your watchlist.
            </Text>
          </View>
        }

        // FlatList calls renderItem for each bookmarked anime.
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* Poster from the master anime catalogue */}
            <Image
              source={{ uri: item.image }}
              style={styles.poster}
            />

            <Text
              style={styles.animeTitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.title}
            </Text>

            <View style={styles.informationRow}>
              <Text style={styles.audio}>
                {item.audio}
              </Text>

              {/* Remove the anime from the shared watchlist */}
              <Pressable
                hitSlop={10}
                onPress={() => toggleFavourite(item.id)}
              >
                <Ionicons
                  name="bookmark"
                  size={22}
                  color="#FF640A"
                />
              </Pressable>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default MyLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  gridContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
  },

  gridRow: {
    justifyContent: "space-between",
    marginBottom: 20,
  },

  card: {
    width: "48%",
  },

  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    resizeMode: "cover",
  },

  animeTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },

  informationRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },

  audio: {
    color: "#999999",
    fontSize: 13,
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },

  emptyDescription: {
    color: "#999999",
    fontSize: 14,
    marginTop: 12,
    textAlign: "center",
  },
});
