
import { ScrollView, StatusBar, Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import Header from "../../components/Header";
import FeaturedCarousel from "../../components/FeaturedCarousel";
import AnimeCarousel from "../../components/AnimeCarousel";
import { trendingAnime } from "../../data/TrendingData";
import ContinueWatchingCarousel from "../../components/ContinueWatchingCarousel"

const Home = () => {
  // Tracks whether the header should have a black background.
  // It starts transparent so the featured image is visible behind it.
  const [headerBlack, setHeaderBlack] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        // The scroll event provides information about the user's
        // current position inside the scrollable Home screen.
        onScroll={(event) => {
          // contentOffset.y is the vertical scrolling distance.
          const scrollY = event.nativeEvent.contentOffset.y;

          // Once the user scrolls 520 units, change the header
          // background to black. Scrolling back reverses this.
          setHeaderBlack(scrollY >= 520);
        }}
        // This requests scroll updates frequently for responsive UI changes.
        scrollEventThrottle={16}
      >
        {/* Featured anime section */}
        <FeaturedCarousel />
        {/* Trending anime section */}
        <AnimeCarousel
          title="Trending in Canada"
          anime={trendingAnime}/>
        {/* Simulcasts Section */}
        <AnimeCarousel
        // Temporarily reuse Trending data to test the Simulcasts layout until its own data is created. 
          title="October 2026 Simulcasts"
          anime={trendingAnime}/>
        {/* Landscape episode cards displaying saved viewing progress */}
        <ContinueWatchingCarousel />
      </ScrollView>
      <View pointerEvents="box-none"
        style={[styles.headerOverlay, headerBlack && styles.headerBlack,]}>
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
    top: 12,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  headerBlack: {
    backgroundColor: "#000",
    // Because we accounted for the status bar earlier to position the icons
    // We then subtract that height so the header bar doesnt have a section cut off near the top
    marginTop: -(StatusBar.currentHeight ?? 0),
    paddingTop: StatusBar.currentHeight ?? 0,
  },
});
