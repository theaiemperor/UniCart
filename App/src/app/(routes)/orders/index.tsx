import Container from "@/src/components/global/Container";
import ProtectRoute from "@/src/components/global/ProtectRoute";
import { Text } from "@/src/components/ui/text";

export default function () {
  return (
    <ProtectRoute>
      <Container>
        <Text>You can manage your orders here</Text>
      </Container>
    </ProtectRoute>
  );
}
