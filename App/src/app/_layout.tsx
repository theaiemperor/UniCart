import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { loadUserInfoFromStorage } from "../features/auth/authApi";
import "../static/global.css";

export default function RootLayout() {
  const client = new QueryClient();

  useEffect(() => {
    loadUserInfoFromStorage();
  }, []);

  return (
    <QueryClientProvider client={client}>
      <GluestackUIProvider mode="system">
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(routes)" />
        </Stack>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
}
