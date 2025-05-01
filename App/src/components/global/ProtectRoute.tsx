import useAuth from "@/src/features/auth/useAuth";
import { PropsWithChildren, ReactNode } from "react";
import { Box } from "../ui/box";

import { Button, ButtonText } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { Link } from "expo-router";
import { Image, useWindowDimensions, View } from "react-native";

interface IProtectedRouteScreen {
  title?: string;
  description?: string;
  buttonText?: string | null;
  buttonLink?: string;
}
function ProtectedRouteScreen(props: IProtectedRouteScreen) {
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

        <Text className="text-3xl font-bold text-center text-error-800">
          {props.title || "UnAuthorized Action"}
        </Text>

        <Text className="text-center my-5 text-base max-w-md">
          {props.description ||
            "You need to log in before performing this action. Please log in to continue."}
        </Text>

        <Box className="grid grid-cols-2 gap-3">
          {props.buttonText !== null && (
            <Link href={props.buttonLink || "/auth/login"} asChild>
              <Button>
                <ButtonText>{props.buttonText || "Log in Now 🔐"}</ButtonText>
              </Button>
            </Link>
          )}
          <Link href="/" asChild>
            <Button>
              <ButtonText>Go to Home 🏠</ButtonText>
            </Button>
          </Link>
        </Box>
      </VStack>
    </View>
  );
}

// Default Export
interface Props extends PropsWithChildren, IProtectedRouteScreen {
  allowdRoles?: string[];
  fallback?: ReactNode;
}

export default function (props: Props) {
  const { userInfo } = useAuth();
  const Fallback = props.fallback || <ProtectedRouteScreen {...props} />;
  const allowed = props.allowdRoles || ["user"];

  if (!userInfo && allowed.includes("guest")) {
    return props.children;
  } else if (userInfo && allowed.includes(userInfo.role)) {
    return props.children;
  }

  return Fallback;
}
