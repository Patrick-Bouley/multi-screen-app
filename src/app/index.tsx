
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import Header from "../components/Header";
import FeaturedCarousel from "../components/FeaturedCarousel";

const Home = () => {
  const [headerBlack, setHeaderBlack] = useState(false);
  return (
    <View style={styles.container}>
      <ScrollView
        onScroll={(event) => {
          const scrollY = event.nativeEvent.contentOffset.y;
          setHeaderBlack(scrollY >= 520);
        }}
        scrollEventThrottle={16}
      >
        {/* Featured anime section */}
        <FeaturedCarousel />

        {/* Trending anime section - to be added later */}
        <Text style={styles.sectionTitle}>
          Trending in Canada
        </Text>
      </ScrollView>
      <View
        style={[
          styles.headerOverlay,
          headerBlack && styles.headerBlack,
        ]}
      >
        <Header isHome={true} />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  headerBlack: {
    backgroundColor: "#000",
  },
});
