import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='(tabs)' />
  </Stack>
}
// But in new Expo RN these not compulsory it handles it own