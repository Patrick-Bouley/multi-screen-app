/*
 * Tab Navigation Layout
 *
 * Creates the bottom navigation bar for the five main
 * sections of the Crunchyroll application.
 *
 * Expo Router manages the selected tab and switches between screens automatically.
 *
 * The navigation bar uses the device's safe-area insets
 * to prevent overlap with a phones natural navigation buttons
 */

import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabLayout = () => {
    // Get the device's safe-area measurements.
    // These tell us how much space must be reserved
    // for system controls, such as Android navigation buttons.
    const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF640A",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarStyle: {
            // The bottom Nav Bar colors
            backgroundColor: "#1e1b1b",
            borderTopColor: "#303030",

            // Add the devices bottom safe area to our tab bar height. 
            // This makes it so the androids controlls dont overlap with our nav bar
            height: 60 + insets.bottom,
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
            // Expo Router provides focused and color automatically.
            // focused is true when this tab is selected.
            // This will change them between filled and outlined icons as well.

            // The typeof check ensures the icon receives a string, 
            // there was an error with just using color={color} and this is how I got past it
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
