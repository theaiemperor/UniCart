import { Box } from "@/src/components/ui/box";
import { Button, ButtonText } from "@/src/components/ui/button";
import { Heading } from "@/src/components/ui/heading";
import { HStack } from "@/src/components/ui/hstack";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { Link } from "expo-router";
import CartItem from "../../../components/routes/cart/CartItem";
import useCart, { ICartStore } from "../../../features/cart/useCart";

export default function () {
  const { items, meta } = useCart<ICartStore>((state) => state);

  if (Object.keys(items).length === 0) {
    return (
      <Box className="flex-1  justify-center">
        <Heading className="text-center">Your Shopping Cart is empty</Heading>
        <Link href={"/products"} asChild>
          <Button className="w-max self-center mt-5">
            <ButtonText>Try adding some items</ButtonText>
          </Button>
        </Link>
      </Box>
    );
  }

  return (
    <VStack className="p-2 w-full md:gap-5 md:w-2/3 lg:w-3/5 self-center h-full overflow-y-auto ">
      <VStack className="my-2 gap-3 ">
        <Heading className="text-center mb-2">Your Shopping Cart </Heading>
        {Object.keys(items).map((item) => {
          return <CartItem key={item} {...{ ...items[item], id: item }} />;
        })}
      </VStack>
      <HStack className="justify-between items-center">
        <Text>
          Subtotal({meta.totalQuantity} items) :{" "}
          <Text className="font-bold">{meta.totalPrice}Rs.</Text>
        </Text>
        <Button size="sm">
          <ButtonText>Checkout</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
}
