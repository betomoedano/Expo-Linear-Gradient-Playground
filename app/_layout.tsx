import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Platform } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: true,
          headerBlurEffect: colorScheme === "dark" ? "dark" : "light",
          headerLargeTitle: true,
          headerTransparent: Platform.select({
            ios: true,
            web: true,
            android: false,
          }),
          headerTintColor: Platform.select({
            ios: colorScheme === "dark" ? "white" : undefined,
            web: "white",
          }),
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Gradients",
          }}
        />
        <Stack.Screen name="gradient-details" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
