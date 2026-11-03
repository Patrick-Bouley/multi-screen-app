/*
 * My Lists Screen
 *
 * Displays four sections:
 * - Watchlist: anime saved through FavouritesContext
 * - Crunchylists: placeholder
 * - History: placeholder
 * - Downloads: placeholder
 *
 * The Watchlist uses a vertical FlatList with one anime
 * per row to match the Crunchyroll reference.
 */
import { useState } from "react";
import { Alert, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import Header from "../../components/Header";
import { allAnime } from "../../data/AnimeData";
import type { Anime } from "../../data/AnimeData";
import { useFavourites } from "../../context/FavouritesContext";

type ListCategory =
  | "Watchlist"
  | "Crunchylists"
  | "History"
  | "Downloads";

const categories: ListCategory[] = [
  "Watchlist",
  "Crunchylists",
  "History",
  "Downloads",
];

const MyLists = () => {
  const { favourites, toggleFavourite } = useFavourites();

  const [activeCategory, setActiveCategory] =
    useState<ListCategory>("Watchlist");

  // Local sample feature for creating named Crunchylists.
  const [customLists, setCustomLists] = useState<string[]>([]);
  const [newListName, setNewListName] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Convert bookmarked IDs into full anime objects.
  const savedAnime = allAnime.filter((anime) =>
    favourites.includes(anime.id)
  );

  const createList = () => {
    const name = newListName.trim();

    if (!name) {
      Alert.alert("List Name", "Please enter a list name.");
      return;
    }

    setCustomLists((current) => [...current, name]);
    setNewListName("");
    setShowCreateModal(false);
  };

  const openDetails = (id: string) => {
    router.push({
      pathname: "/anime/[id]",
      params: { id },
    });
  };

  const showOptions = (anime: Anime) => {
    Alert.alert(anime.title, "Choose an option", [
      {
        text: "Remove from Watchlist",
        onPress: () => toggleFavourite(anime.id),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  // Render one horizontal anime row.
  const renderWatchlistItem = ({ item }: { item: Anime }) => (
    <View style={styles.watchlistCard}>
      {/* Poster opens the Details screen. */}
      <Pressable onPress={() => openDetails(item.id)}>
        <Image
          source={{ uri: item.image }}
          style={styles.poster}
        />
      </Pressable>

      <View style={styles.cardInformation}>
        <Pressable onPress={() => openDetails(item.id)}>
          <Text style={styles.animeTitle} numberOfLines={2}>
            {item.title}
          </Text>

          <Text style={styles.episode} numberOfLines={2}>
            {item.episode ?? "Start Watching E1"}
          </Text>
        </Pressable>

        <View style={styles.cardBottomRow}>
          <Text style={styles.audio}>{item.audio}</Text>

          <View style={styles.cardButtons}>
            {/* Remove this anime from the shared Watchlist. */}
            {/* The icon reflects whether this anime is saved. */}
            <Pressable
            hitSlop={10}
            onPress={() => toggleFavourite(item.id)}>
            <Ionicons
                name={
                favourites.includes(item.id)
                    ? "heart"
                    : "heart-outline"
                }
                size={25}
                color="#FFFFFF"/>
            </Pressable>

            <Pressable
              hitSlop={10}
              onPress={() => showOptions(item)}
            >
              <Ionicons
                name="ellipsis-vertical"
                size={22}
                color="#FFFFFF"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );

  // Shared layout for empty categories.
  const renderEmptyState = (
    icon: React.ComponentProps<typeof Ionicons>["name"],
    title: string,
    description: string
  ) => (
    <View style={styles.emptyContainer}>
      <Ionicons name={icon} size={80} color="#FF640A" />

      <Text style={styles.emptyTitle}>{title}</Text>

      <Text style={styles.emptyDescription}>
        {description}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header title="My Lists" />

      {/* Horizontal navigation between My Lists categories. */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryNavigation}
        contentContainerStyle={styles.categoryRow}
      >
        {categories.map((category) => (
          <Pressable
            key={category}
            onPress={() => setActiveCategory(category)}
            style={[
              styles.categoryButton,
              activeCategory === category &&
                styles.activeCategory,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                activeCategory === category &&
                  styles.activeCategoryText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Only render the content for the selected category. */}
      {activeCategory === "Watchlist" && (
        <FlatList
          data={savedAnime}
          keyExtractor={(item) => item.id}
          renderItem={renderWatchlistItem}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Recent Activity
              </Text>

              <View style={styles.headerButtons}>
                <Pressable
                  hitSlop={10}
                  onPress={() =>
                    Alert.alert(
                      "Sort",
                      "Watchlist sorting is not configured yet."
                    )
                  }
                >
                  <MaterialIcons
                    name="sort"
                    size={26}
                    color="#FFFFFF"
                  />
                </Pressable>

                <Pressable
                  hitSlop={10}
                  onPress={() =>
                    Alert.alert(
                      "Filter",
                      "Watchlist filtering is not configured yet."
                    )
                  }
                >
                  <Ionicons
                    name="options-outline"
                    size={26}
                    color="#FFFFFF"
                  />
                </Pressable>
              </View>
            </View>
          }
          ListEmptyComponent={renderEmptyState(
            "bookmark-outline",
            "Your Watchlist is Empty",
            "Add anime from Home or Browse to see them here."
          )}
        />
      )}

      {activeCategory === "Crunchylists" && (
        <View style={styles.crunchylistsContent}>
          {customLists.length === 0 ? (
            renderEmptyState(
              "albums-outline",
              "You don't have any Crunchylists yet.",
              "Let's create one!"
            )
          ) : (
            <ScrollView style={styles.customListScroll}>
              {customLists.map((name, index) => (
                <View
                  key={`${name}-${index}`}
                  style={styles.customListRow}
                >
                  <Ionicons
                    name="list-outline"
                    size={24}
                    color="#FF640A"
                  />
                  <Text style={styles.customListName}>
                    {name}
                  </Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      )}

      {activeCategory === "History" && (
        renderEmptyState(
          "time-outline",
          "No Watch History",
          "Episodes you watch will appear here."
        )
      )}

      {activeCategory === "Downloads" && (
        renderEmptyState(
          "download-outline",
          "No Downloads",
          "Downloaded episodes will appear here."
        )
      )}

      {/* Android-compatible dialog for entering a list name.
          Alert.prompt() is not supported on Android. */}
      <Modal
        visible={showCreateModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowCreateModal(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Create New List
            </Text>

            <TextInput
              value={newListName}
              onChangeText={setNewListName}
              placeholder="List name"
              placeholderTextColor="#777777"
              style={styles.input}
              maxLength={40}
            />

            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => {
                  setNewListName("");
                  setShowCreateModal(false);
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>

              <Pressable onPress={createList}>
                <Text style={styles.confirmText}>Create</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MyLists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  categoryNavigation: {
    height: 60,
    flexGrow: 0,
  },
  categoryRow: {
    paddingHorizontal: 8,
    alignItems: "stretch",
  },
  categoryButton: {
    paddingHorizontal: 12,
    justifyContent: "center",
    borderBottomWidth: 3,
    borderBottomColor: "#303030",
  },
  activeCategory: {
    borderBottomColor: "#FF640A",
  },
  categoryText: {
    color: "#999999",
    fontSize: 15,
    fontWeight: "bold",
  },
  activeCategoryText: {
    color: "#FFFFFF",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    flexGrow: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 24,
  },
  watchlistCard: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 12,
    minHeight: 155,
  },
  poster: {
    width: 100,
    height: 150,
    resizeMode: "cover",
  },
  cardInformation: {
    flex: 1,
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  animeTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  episode: {
    color: "#999999",
    fontSize: 14,
    marginTop: 6,
  },
  cardBottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  audio: {
    color: "#999999",
    fontSize: 13,
    flexShrink: 1,
  },
  cardButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 36,
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
  crunchylistsContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  customListScroll: {
    flex: 1,
    marginTop: 20,
  },
  customListRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#303030",
  },
  customListName: {
    color: "#FFFFFF",
    fontSize: 17,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    padding: 24,
  },
  modalContent: {
    backgroundColor: "#242424",
    padding: 24,
    borderRadius: 12,
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#101010",
    borderWidth: 1,
    borderColor: "#555555",
    borderRadius: 6,
    padding: 12,
    color: "#FFFFFF",
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 30,
    marginTop: 24,
  },
  cancelText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  confirmText: {
    color: "#FF640A",
    fontSize: 16,
    fontWeight: "bold",
  },
});