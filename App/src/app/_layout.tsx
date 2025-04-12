import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import "../static/global.css";

export default function RootLayout() {
  const client = new QueryClient();

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
