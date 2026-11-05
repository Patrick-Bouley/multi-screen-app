/*
 * Header Component
 *
 * Reusable header for the Crunchyroll application.
 *
 * On Home, the header displays a temporary logo.
 * On other screens, it can display a screen title.
 *
 * The Cast and Search buttons currently display alerts
 * because those features will not be implemented.
 */

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

// Props define which information a parent component is allowed to pass into this Header.
// The ? makes each property optional.
interface HeaderProps {
  title?: string;
  isHome?: boolean;
}

// Destructure the props so we can use title and isHome directly.
// isHome defaults to false when the parent does not provide it.
const Header = ({ title, isHome = false }: HeaderProps) => {
  return (
    <View style={styles.header}>
      {/* Left side: logo or screen title */}
      <View style={styles.leftSection}>
        {isHome ? (
          // If isHome is true, display the temporary logo.
          <Text style={styles.logo}>◉</Text>
        ) : (
          // Otherwise, display the title provided through props.
          <Text style={styles.title}>{title}</Text>
        )}
      </View>

      {/* Right side: casting and search */}
      <View style={styles.rightSection}>
        <Pressable
        // hitSlop expands the touch area without changing the icon size.
          hitSlop={10}
          // I'm using Alert cause Im not actually making a casting capability
          onPress={() => {
            // cosole log is here for debugging
            console.log("Cast button pressed");
            Alert.alert("Cast", "Casting selected");
          }}
        >
          <MaterialIcons name="cast" size={22} color="#fff" />
        </Pressable>

        <Pressable
          style={styles.iconButton}
          hitSlop={20}
          // using Alert cause Im not actually making a search capability
          onPress={() => {
            // amd agin. needed some debugging earlier so i have consol log in here still
            console.log("Search button pressed");
            Alert.alert("Search", "Search selected");
          }}
        >
          <Ionicons 
            name="search-outline" 
            size={22} 
            color="#fff"
            pointerEvents="none" />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 6
  },
  leftSection: {
    flex: 1,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  logo: {
    color: "#FF640A",
    fontSize: 45,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
