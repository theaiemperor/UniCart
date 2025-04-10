import { Link, Stack } from "expo-router";
import "../static/global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Platform } from "react-native";
import CartFloatingButton from "./cart/components/CartFloatingButton";
import { Fab, FabIcon } from "../components/ui/fab";
import { HomeIcon } from "lucide-react-native";

export default function RootLayout() {
  const client = new QueryClient();
  const isWeb = Platform.OS === "web";

  return (
    <>
      <QueryClientProvider client={client}>
        <GluestackUIProvider mode="system">
          <Stack
            screenOptions={{
              headerShown: !isWeb,
              headerRight: () => <CartFloatingButton />,
            }}
          >
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen
              name="products/index"
              options={{ title: "Products" }}
            />
            <Stack.Screen
              name="cart/index"
              options={{ title: "Shopping Cart" }}
            />
          </Stack>
          {Platform.OS === "web" && (
            <>
              <Fab placement="bottom left">
                <Link asChild href="/">
                  <FabIcon as={HomeIcon} />
                </Link>
              </Fab>
              <Fab className="bg-transparent hover:bg-transparent">
                <CartFloatingButton />
              </Fab>
            </>
          )}
        </GluestackUIProvider>
      </QueryClientProvider>
    </>
  );
}
