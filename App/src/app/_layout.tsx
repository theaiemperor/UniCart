import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { loadUserInfoFromStorage } from "../features/auth/authApi";
import useSettings from "../features/settings/useSettings";
import "../static/global.css";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const client = new QueryClient();
  const schema = useColorScheme();

  const {
    settings: {
      interface: { isDark, current },
    },
    updateSettings,
  } = useSettings();

  useEffect(() => {
    loadUserInfoFromStorage();

    updateSettings({
      interface: { isDark: current === "system" && schema === "dark", current },
    });
  }, [schema]);

  return (
    <QueryClientProvider client={client}>
      <GluestackUIProvider mode={isDark ? "dark" : "light"}>
        <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(routes)" />
          </Stack>
        </ThemeProvider>
        <StatusBar style={isDark ? "light" : "dark"} />
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
