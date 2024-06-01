import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="movieScreen" options={{ headerShown: false }} />
      <Stack.Screen name="personScreen" options={{ headerShown: false }} />
      <Stack.Screen name="searchScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
