import { Button, ButtonText } from "@/src/components/ui/button";
import useCart from "../../../features/cart/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ShowAlert from "@/src/components/global/ShowAlert";
import { Link, useRouter } from "expo-router";
import ProtectRoute from "@/src/components/global/ProtectRoute";
import { createOrder } from "../../../features/orders/orderApi";

function FallbackBtn() {
  return (
    <Link href={"/auth/login"} asChild>
      <Button size="sm">
        <ButtonText>Log in to checkout</ButtonText>
      </Button>
    </Link>
  );
}

export default function () {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const client = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => createOrder(Object.values(items)),
    onSuccess: (data) => {
      ShowAlert({
        title: "Order Created Successfully",
        description:
          "Your order has been placed successfully. You can view your order at orders.",
        buttonText: "View My Order",
        buttonFn: () => {
          clearCart();
          client.invalidateQueries({ queryKey: ["orders"] });
          router.push("/orders/" + data.id + "?refresh=true");
        },
      });
    },
    onError: (err) => {
      console.log("err creating order : ", { err });
      ShowAlert({
        title: "Order Not placed",
        description:
          "Due to some problem we can not create this order. Please try again later",
      });
    },
  });

  function handleCheckOut() {
    mutation.mutate();
  }

  return (
    <ProtectRoute fallback={<FallbackBtn />}>
      <Button size="sm" onPress={handleCheckOut}>
        <ButtonText>Checkout</ButtonText>
      </Button>
    </ProtectRoute>
  );
}
