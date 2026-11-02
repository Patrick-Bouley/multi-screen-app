
import { ScrollView, Text, View, StyleSheet } from "react-native";

import FeaturedCarousel from "../components/FeaturedCarousel";

const Home = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Featured anime section */}
        <FeaturedCarousel />

        {/* Trending anime section - to be added later */}
        <Text style={styles.sectionTitle}>
          Trending in Canada
        </Text>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
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
