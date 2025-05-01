import { Link } from "expo-router";
import { View, Image, useWindowDimensions } from "react-native";
import { Text } from "@/src/components/ui/text";
import { Button, ButtonText } from "@/src/components/ui/button";
import { VStack } from "@/src/components/ui/vstack";

export default function NotFoundScreen() {
  const { width } = useWindowDimensions();
  const isLarge = width >= 768;

  return (
    <View className="flex-1 justify-center items-center  px-6">
      <VStack className="items-center space-y-6">
        <Image
          source={{ uri: "/assets/assets/icon.png" }}
          style={{ width: isLarge ? 100 : 80, height: isLarge ? 100 : 80 }}
          resizeMode="contain"
        />

        <Text className="text-3xl font-bold text-center">
          Oops! Page Not Found
        </Text>

        <Text className="text-center  text-base max-w-md">
          The page you're looking for doesn't exist or has been moved. Let’s get
          you back to shopping!
        </Text>

        <Link href="/" asChild>
          <Button>
            <ButtonText>Go to Home 🛍️</ButtonText>
          </Button>
        </Link>
      </VStack>
    </View>
  );
}
