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

export default function RootLayout() {
  const client = new QueryClient();

  const {
    settings: {
      interface: { isDark },
    },
  } = useSettings();

  useEffect(() => {
    loadUserInfoFromStorage();
  }, []);

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
