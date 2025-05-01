import CartButton from "@/src/components/routes/cart/CartButton";
import { useBreakpointValue } from "@/src/components/ui/utils/use-break-point-value";
import useSettings from "@/src/features/settings/useSettings";
import { Slot, Stack } from "expo-router";
import { Platform } from "react-native";

interface Props {
  name?: string;
  title: string;
}

export default function ({ name, title }: Props) {
  const hideStack = useBreakpointValue({ md: true });
  const { isDark } = useSettings((s) => s.settings.interface);

  if (Platform.OS === "web" && hideStack) {
    return <Slot />;
  }
  return (
    <Stack
      screenOptions={{
        headerRight: () => <CartButton color={isDark ? "white" : "black"} />,
      }}
    >
      <Stack.Screen name={name || "index"} options={{ title }} />
    </Stack>
  );
}
