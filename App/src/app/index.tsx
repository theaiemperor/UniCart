import { StatusBar } from "expo-status-bar";
import { Alert, Platform, View } from "react-native";
import { Button, ButtonText } from "../components/ui/button";
import { Text } from "../components/ui/text";
import { Link } from "expo-router";

export default function Index() {
  async function greet() {
    Alert.alert("Greeting Message", "Hello, From unicart!");
    Platform.OS === "web" && alert("Hello From unicart!");
  }

  return (
    <View className="h-screen justify-center items-center">
      <Text className="my-5 text-4xl font-extrabold">Welcome to UniCart!</Text>
      <Button onPress={greet}>
        <ButtonText>Greet</ButtonText>
      </Button>

      <Link href={"/products"} asChild className="mt-5">
        <Button variant="link">
          <ButtonText>Explore Products</ButtonText>
        </Button>
      </Link>
      <StatusBar style="auto" />
    </View>
  );
}
