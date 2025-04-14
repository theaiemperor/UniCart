import Container from "@/src/components/global/Container";
import UserInfo from "@/src/components/routes/settings/UserInfo";
import { Text } from "@/src/components/ui/text";

export default function () {
  return (
    <Container className="gap-3">
      <Text>You can manage Setting from here </Text>
      <UserInfo />
    </Container>
  );
}
