import { StatusBar } from "expo-status-bar";
import { Alert, Platform, View } from "react-native";
import { Button, ButtonText } from "../components/ui/button";
import { Text } from "../components/ui/text";

export default function Index() {
  function greet() {
    Alert.alert("Greeting Message", "Hello, From unicart!");
    Platform.OS === "web" && alert("Hello From unicart!");
  }

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="my-5 text-4xl font-extrabold">Welcome to UniCart!</Text>
      <Button onPress={greet}>
        <ButtonText>Greet</ButtonText>
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}
