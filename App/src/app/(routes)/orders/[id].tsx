import Container from "@/src/components/global/Container";
import ProtectRoute from "@/src/components/global/ProtectRoute";
import OrderDetail from "@/src/components/routes/orders/OrderDetail";
import { Box } from "@/src/components/ui/box";
import { Spinner } from "@/src/components/ui/spinner";
import { Text } from "@/src/components/ui/text";
import { fetchOrder } from "@/src/features/orders/orderApi";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";

function Details() {
  const { id } = useLocalSearchParams();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["orders", id],
    queryFn: () => fetchOrder(+id),
  });

  if (isError) {
    return <Text className="text-center my-5">Some problem happed!</Text>;
  }

  if (isLoading) {
    return (
      <Box className="flex-1 w-full justify-center items-center">
        <Spinner size={56} />
      </Box>
    );
  }

  return (
    <Container>
      {data ? (
        <OrderDetail orderInfo={data} />
      ) : (
        <Text className="text-center text-pretty">Order Not found!</Text>
      )}
    </Container>
  );
}

export default function () {
  return (
    <ProtectRoute>
      <Stack.Screen options={{ title: "Order Detail page" }} />
      <Details />
    </ProtectRoute>
  );
}
