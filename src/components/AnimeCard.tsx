/*
 * AnimeCard Component
 *
 * Displays a single anime inside a horizontal carousel.
 *
 * Each card receives an Anime object through props and
 * uses that information to display its poster, title, and available audio.
 *
 * The poster and three-dot options button currently use
 * temporary alerts. Later, these can be connected to
 * Anime Details and My Lists functionality.
 */

import {Alert, Image, Pressable, StyleSheet, Text, View,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import type { Anime } from "../data/TrendingData";

// Each card receives one anime object from our data.
interface AnimeCardProps {
  anime: Anime;
}

const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <View style={styles.card}>

        {/* Anime poster */}
        {/* Temporary interaction until Anime Details is implemented. */}
        <Pressable onPress={() => Alert.alert(anime.title)}>
            <Image
                source={{ uri: anime.image }}
                style={styles.poster}/>
        </Pressable>

        {/* Anime title */}
        <Text style={styles.title} 
            numberOfLines={1} 
            // Replace the cut-off end of long titles with "...".
            ellipsizeMode="tail">{anime.title}</Text>

        {/* Audio and options menu */}
        <View style={styles.audioRow}>
            <Text style={styles.audio}>{anime.audio}</Text>
            <Pressable
                hitSlop={10}
                onPress={() => Alert.alert("Options", anime.title)}>
            <Ionicons
                name="ellipsis-vertical"
                size={18}
                color="#7d7d7d"/>
            </Pressable>
        </View>
    </View>
  );
};

export default AnimeCard;

const styles = StyleSheet.create({
    card: {
        width: 140,
    },
    poster: {
        width: 140,
        height: 210,
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
