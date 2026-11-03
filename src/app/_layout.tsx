/*
 * Root Layout
 *
 * Provides Stack navigation for the application.
 *
 * FavouritesProvider makes shared bookmark state available to every screen inside the Stack,
 * including the Home, Browse, and My Lists tabs.
 */
import { Stack } from "expo-router";
import { FavouritesProvider } from "../context/FavouritesContext";

export default function RootLayout() {
  return (
    <FavouritesProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </FavouritesProvider>
  );
}
