import Container from "@/src/components/global/Container";
import ProtectRoute from "@/src/components/global/ProtectRoute";
import OrderList from "@/src/components/routes/orders/OrderList";
import { Box } from "@/src/components/ui/box";
import { Spinner } from "@/src/components/ui/spinner";
import { Text } from "@/src/components/ui/text";
import { fetchAllOrders } from "@/src/features/orders/orderApi";
import { useQuery } from "@tanstack/react-query";

function Orders() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchAllOrders,
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
        <OrderList orders={data} />
      ) : (
        <Text className="text-center text-pretty">You have no orders yet!</Text>
      )}
    </Container>
  );
}

export default function () {
  return (
    <ProtectRoute>
      <Orders />
    </ProtectRoute>
  );
}
