import { Stack } from "expo-router";

export default function RootLayout() {
  // We hide Expo Router's default header because our
  // application uses its own custom Crunchyroll header.
  return <Stack screenOptions={{ headerShown: false }} />;
}
