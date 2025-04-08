import { Stack } from "expo-router";
import "../static/global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Platform } from "react-native";

export default function RootLayout() {
  const client = new QueryClient();
  const isWeb = Platform.OS === "web";

  return (
    <>
      <QueryClientProvider client={client}>
        <GluestackUIProvider mode="system">
          <Stack screenOptions={{ headerShown: !isWeb }}>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen
              name="products/index"
              options={{ title: "Products" }}
            />
          </Stack>
        </GluestackUIProvider>
      </QueryClientProvider>
    </>
  );
}
