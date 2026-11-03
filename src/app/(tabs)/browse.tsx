/*
 * Browse Screen
 *
 * Displays anime in a vertically scrolling, two-column grid.
 *
 * The top navigation lets users select different categories.
 * The currently selected category is highlighted in orange.
 *
 * For now, the anime data is reused from TrendingData.
 * Sort and Filter are temporary buttons for now
 */
import { useState } from "react";
import {Alert, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, } from "@expo/vector-icons";
import Header from "../../components/Header";
import { trendingAnime } from "../../data/TrendingData";
import type { Anime } from "../../data/TrendingData";

// Categories displayed across the top of Browse.
const categories = [
  "All Anime",
  "Simulcasts",
  "Anime Genres",
  "Music",
  "Games",
];

const Browse = () => {
  // Tracks which category is currently selected.
  const [activeCategory, setActiveCategory] = useState("All Anime");

  // Creates one anime card within the two-column grid.
  const renderAnime = ({ item }: { item: Anime }) => (
    <View style={styles.card}>

      {/* Anime poster */}
      <Pressable
        onPress={() => Alert.alert(item.title)}>
        <Image
          source={{ uri: item.image }}
          style={styles.poster}/>
      </Pressable>
      {/* Anime title */}
      <Text
        style={styles.animeTitle}
        numberOfLines={1}
        ellipsizeMode="tail">
        {item.title}
      </Text>
      {/* Audio information and options button */}
      <View style={styles.audioRow}>
        <Text style={styles.audio}>{item.audio}</Text>
        <Pressable
          hitSlop={10}
          onPress={() => Alert.alert("Options", item.title)}>
          <Ionicons
            name="ellipsis-vertical"
            size={18}
            color="#7d7d7d"/>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Reuse the Header component with a Browse title */}
      <Header title="Browse" />
      {/* Horizontal category navigation */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryNavigation}
        contentContainerStyle={styles.categoryRow}>
        {categories.map((category) => (
        <Pressable
            key={category}
            onPress={() => setActiveCategory(category)}
            style={[
            styles.categoryButton,
            activeCategory === category && styles.activeCategory,]}>
            <Text
            style={[
                styles.categoryText,
                activeCategory === category && styles.activeCategoryText,]}>
            {category}
            </Text>
        </Pressable>
        ))}
      </ScrollView>

      {/* Vertically scrolling anime grid */}
      <FlatList
        data={trendingAnime}
        renderItem={renderAnime}
        keyExtractor={(item) => item.id}

        // Arrange the anime cards into two columns.
        numColumns={2}

        // Controls spacing between the two columns.
        columnWrapperStyle={styles.gridRow}

        contentContainerStyle={styles.gridContent}

        // Heading and controls appear above the anime cards.
        ListHeaderComponent={
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Popular
            </Text>

            <View style={styles.headerButtons}>

              {/* Temporary Sort button */}
              <Pressable
                hitSlop={10}
                onPress={() => Alert.alert("Sort", "Sort selected")}>
                <MaterialIcons
                  name="sort"
                  size={26}
                  color="#FFFFFF"/>
              </Pressable>

              {/* Temporary Filter button */}
              <Pressable
                hitSlop={10}
                onPress={() => Alert.alert("Filter", "Filter selected")}>
                <Ionicons
                  name="options-outline"
                  size={26}
                  color="#FFFFFF"/>
              </Pressable>
            </View>
          </View>
        }/>
    </SafeAreaView>
  );
};

export default Browse;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    categoryNavigation: {
        height: 60,
        flexGrow: 0,
        overflow: "visible",
    },
    categoryRow: {
        paddingHorizontal: 8,
        gap: 0,
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
    gridContent: {
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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
        alignItems: "center",
        gap: 24,
    },
    gridRow: {
        gap: 12,
        marginBottom: 16,
    },
    card: {
        flex: 1,
        minWidth: 0,
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
    audioRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
    },
    audio: {
        color: "#999999",
        fontSize: 13,
    },
});