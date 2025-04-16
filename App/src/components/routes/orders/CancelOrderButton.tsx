import { Button, ButtonText } from "../../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ShowAlert from "../../global/ShowAlert";
import { useRouter } from "expo-router";
import { cancelOrder } from "@/src/features/orders/orderApi";

export default function CancelOrderButton({ id }: { id: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => cancelOrder(id),
    onSuccess: () => {
      ShowAlert({
        title: "Order Cancelled",
        description: `Your order has been successfully cancelled.`,
      });
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
      router.push("/orders");
    },
    onError: () => {
      ShowAlert({
        title: "Order Not Cancelled",
        description: `Failed to cancel Your order`,
      });
    },
  });

  return (
    <Button className="my-2" onPress={() => mutation.mutate()}>
      <ButtonText>
        {mutation.isPending ? "Cancelling..." : "Cancel Order"}
      </ButtonText>
    </Button>
  );
}
