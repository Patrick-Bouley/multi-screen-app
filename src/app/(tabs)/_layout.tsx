
import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {
    const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF640A",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarStyle: {
          backgroundColor: "#1e1b1b",
          borderTopColor: "#303030",
          height: 60 + insets.bottom,
          paddingTop: 6,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "bold",
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={typeof color === "string" ? color : "#FFFFFF"}
            />
          ),
        }}/>
      <Tabs.Screen
        name="my-lists"
        options={{
          title: "My Lists",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={22}
              color={typeof color === "string" ? color : "#FFFFFF"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={24}
              color={typeof color === "string" ? color : "#FFFFFF"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="simulcasts"
        options={{
          title: "Simulcasts",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name={focused ? "sparkles" : "sparkles-outline"}
              size={22}
              color={typeof color === "string" ? color : "#FFFFFF"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name={focused ? "account-circle" : "account-circle-outline"}
              size={24}
              color={typeof color === "string" ? color : "#FFFFFF"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
