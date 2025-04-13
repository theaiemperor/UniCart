import { Button, ButtonText } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { logOut } from "@/src/features/auth/authApi";
import useAuth from "@/src/features/auth/useAuth";
import { Link, useRouter } from "expo-router";
import { Box } from "../../ui/box";

interface ISettingBoxItem {
  heading: string;
  children: string;
}
function SettingBoxItem({ heading, children }: ISettingBoxItem) {
  return (
    <VStack className="p-2">
      <Text>{heading}</Text>
      <Text className="text-pretty text-xl">{children}</Text>
    </VStack>
  );
}

export default function () {
  const { userInfo } = useAuth();
  const router = useRouter();

  if (!userInfo) {
    return (
      <Card className="w-full max-w-[500px] self-center">
        <Box className="mb-5 ">
          <Text className="text-xl font-bold text-pretty">Your info</Text>
          <Text>
            You are not currently logged in. Log in to view your account info
            and manage your account.
          </Text>
        </Box>
        <Link href={"/auth/login"} asChild>
          <Button>
            <ButtonText>Log in </ButtonText>
          </Button>
        </Link>
      </Card>
    );
  }

  function handleLogOut() {
    logOut();
    router.push("/");
  }

  return (
    <Card
      className="border-primary-900 gap-3 w-full max-w-[500px] self-center"
      variant="outline"
    >
      <SettingBoxItem heading="Name">{userInfo.name || "-"}</SettingBoxItem>
      <SettingBoxItem heading="Email">{userInfo.email}</SettingBoxItem>
      <Button onPress={handleLogOut}>
        <ButtonText>Log Out</ButtonText>
      </Button>
    </Card>
  );
}
