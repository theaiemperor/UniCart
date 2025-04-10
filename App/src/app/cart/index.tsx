import { Text } from "@/src/components/ui/text";
import { View } from "react-native";
import useCart, { ICartItem, ICartStore } from "./hooks/useCart";
import { IObj } from "@/src/types/common";
import { VStack } from "@/src/components/ui/vstack";
import { Heading } from "@/src/components/ui/heading";
import { Card } from "@/src/components/ui/card";
import { Image } from "@/src/components/ui/image";
import { HStack } from "@/src/components/ui/hstack";
import CartItem from "./components/CartItem";
import { Button, ButtonText } from "@/src/components/ui/button";
import { Box } from "@/src/components/ui/box";
import { Link } from "expo-router";

export default function () {
  const { items, meta } = useCart<ICartStore>((state) => state);

  if (Object.keys(items).length === 0) {
    return (
      <View className="flex-1  justify-center">
        <Heading className="text-center">Your Shopping Cart is empty</Heading>
        <Link href={"/products"} asChild>
          <Button className="w-max self-center mt-5">
            <ButtonText>Try adding some items</ButtonText>
          </Button>
        </Link>
      </View>
    );
  }

  return (
    <View>
      <VStack className="gap-3 p-4 w-full md:gap-5 md:w-2/3 lg:w-3/5 self-center">
        <Heading className="text-center">Your Shopping Cart </Heading>
        {Object.keys(items).map((item) => {
          return <CartItem key={item} {...{ ...items[item], id: item }} />;
        })}
        <HStack className="justify-between items-center ">
          <Text>
            Subtotal({meta.totalQuantity} items) :{" "}
            <Text className="font-bold">{meta.totalPrice}Rs.</Text>
          </Text>
          <Button size="sm">
            <ButtonText>Checkout</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </View>
  );
}
