import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

// Defines the information that each screen can send to the header.
interface HeaderProps {
  title?: string;
  isHome?: boolean;
}

const Header = ({ title, isHome = false }: HeaderProps) => {
  return (
    <View style={styles.header}>
      {/* Left side: logo or screen title */}
      <View style={styles.leftSection}>
        {isHome ? (
          //temp logo for now, until I find the crunchyroll logo
          <Text style={styles.logo}>◉</Text>
        ) : (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>

      {/* Right side: casting and search */}
      <View style={styles.rightSection}>
        <Pressable
          hitSlop={10}
          // I'm using Alert cause Im not actually making a casting capability
          onPress={() => {
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
    paddingVertical: 14,
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
    fontSize: 38,
    fontWeight: "bold",
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
});
