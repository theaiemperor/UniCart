import { Box } from "@/src/components/ui/box";
import { Button, ButtonText } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Alert, Platform } from "react-native";

export default function Index() {
  async function greet() {
    Alert.alert("Greeting Message", "Hello, From unicart!");
    Platform.OS === "web" && alert("Hello From unicart!");
  }

  return (
    <Box className="h-full justify-center items-center">
      <Text className="my-5 text-4xl font-extrabold">Welcome to UniCart!</Text>
      <Button onPress={greet}>
        <ButtonText>Greet</ButtonText>
      </Button>

      <Link href={"/products"} asChild className="mt-5">
        <Button variant="link">
          <ButtonText className="font-bold">Explore Products</ButtonText>
        </Button>
      </Link>
      <StatusBar style="auto" />
    </Box>
  );
}
