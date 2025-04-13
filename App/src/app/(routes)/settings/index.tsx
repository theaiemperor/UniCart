import UserInfo from "@/src/components/routes/settings/UserInfo";
import { Box } from "@/src/components/ui/box";
import { Text } from "@/src/components/ui/text";

export default function () {
  return (
    <Box className="p-2 gap-3">
      <Text>You can manage Setting from here </Text>
      <UserInfo />
    </Box>
  );
}
