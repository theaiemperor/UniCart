import { Button, ButtonText } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { logOut } from "@/src/features/auth/authApi";
import useAuth from "@/src/features/auth/useAuth";
import { Link, useRouter } from "expo-router";
import ShowData from "../../global/ShowData";

export default function () {
  const { userInfo } = useAuth();
  const router = useRouter();

  if (!userInfo) {
    return (
      <Card className="gap-3">
        <ShowData title="Your info">
          You are not currently logged in. Log in to view your account info and
          manage your account.
        </ShowData>

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
    <Card className="border-primary-900 gap-3" variant="outline">
      <ShowData title="Name">{userInfo.name || "-"}</ShowData>

      <ShowData title="Email">{userInfo.email}</ShowData>
      <Button onPress={handleLogOut}>
        <ButtonText>Log Out</ButtonText>
      </Button>
    </Card>
  );
}
