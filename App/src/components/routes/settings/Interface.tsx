import useSettings from "@/src/features/settings/useSettings";
import Tabs from "../../customUI/Tabs";
import { Card } from "../../ui/card";
import { Text } from "../../ui/text";
import { useColorScheme } from "react-native";

export default function () {
  const { settings, updateSettings } = useSettings();
  const schema = useColorScheme();

  const options = {
    dark: () => {
      updateSettings({ interface: { current: "dark", isDark: true } });
    },
    light: () => {
      updateSettings({ interface: { current: "light", isDark: false } });
    },
    system: () => {
      updateSettings({
        interface: { current: "system", isDark: schema === "dark" },
      });
    },
  };

  return (
    <Card className="gap-2">
      <Text className="text-xs">System Appearance </Text>
      <Tabs options={options} initialValue={settings.interface.current} />
    </Card>
  );
}
