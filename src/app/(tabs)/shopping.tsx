/*
 * Shopping Screen
 *
 * Placeholder for the Crunchyroll Store.
 * Uses the same empty-state design as My Lists.
 */

import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../components/Header";

const Shopping = () => {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Reuse the header from the other screens. */}
      <Header title="Shopping" />

      {/* Temporary store placeholder. */}
      <View style={styles.emptyContainer}>
        <Ionicons name="bag-outline" size={80} color="#FF640A" />

        <Text style={styles.emptyTitle}>There's nothing here yet.</Text>

        <Text style={styles.emptyDescription}>
          The Crunchyroll Store is coming soon!
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Shopping;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
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
});