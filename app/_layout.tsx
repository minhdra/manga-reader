import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { TamaguiProvider } from "tamagui";
import appConfig from "@/tamagui.config";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen?.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "home/index",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    // SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    GangOfThree: require("../assets/fonts/SVN-Gang of Three.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen?.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={appConfig} defaultTheme={colorScheme || "dark"}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName="home/index">
          <Stack.Screen
            name="(welcome)"
            options={{ headerShown: false, title: "Welcome" }}
          />
          <Stack.Screen
            name="home"
            options={{ headerShown: true, title: "Home" }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
