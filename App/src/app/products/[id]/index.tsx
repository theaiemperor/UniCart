import React from "react";
import { Box } from "@/src/components/ui/box";
import { Button, ButtonText } from "@/src/components/ui/button";
import { Card } from "@/src/components/ui/card";
import { Heading } from "@/src/components/ui/heading";
import { Spinner } from "@/src/components/ui/spinner";
import { VStack } from "@/src/components/ui/vstack";
import { IProduct } from "@/src/types/products";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image, Platform, Text, View } from "react-native";
import { fetchProduct } from "../logic/productsApi";
import useCart from "../../cart/hooks/useCart";

export default function () {
  const { id } = useLocalSearchParams() as { id: string };
  const { addProduct, items } = useCart((state) => state);

  const ITEM_HEIGHT = Platform.OS === "web" ? "h-screen" : "h-full";
  const ITEM_IN_CART = id in items && items[id].quantity;

  const { data, isLoading, isError } = useQuery<IProduct>({
    queryKey: ["products", id],
    queryFn: () => fetchProduct(id as string),
  });

  if (isLoading) {
    return (
      <>
        <Stack.Screen
          name="products/[id]/index"
          options={{ title: "Loading..." }}
        />
        <View className="flex-1 justify-center">
          <Spinner size={"large"} />
        </View>
      </>
    );
  }

  if (!data || isError) {
    return (
      <>
        <Stack.Screen
          name="products/[id]/index"
          options={{ title: "Not found" }}
        />
        <View className="w-full h-screen flex justify-center items-center ">
          <Text className="text-xl md:text-5xl font-bold">
            {isError ? "Something went wrong!" : "Product Not found!"}
          </Text>
        </View>
      </>
    );
  }

  return (
    <View>
      <Stack.Screen name="products/[id]/index" options={{ title: data.name }} />
      <View className={"p-2 sm:p-10 md:p-20 w-screen " + ITEM_HEIGHT}>
        <Card className="w-full h-full shadow-soft-1 ">
          <Image
            source={{ uri: data.image }}
            className="w-full flex-1 "
            resizeMode="contain"
          />
          <VStack className="p-4 px-2 h-max flex flex-col gap-9 ">
            <Box>
              <Heading size="lg">{data.name}</Heading>
              <Text>{data.description}</Text>
            </Box>
            <Box>
              <Text>Price </Text>
              <Heading size="lg">{data.price} Rs</Heading>
            </Box>
            <Box className="flex-col sm:flex-row w-full max-w-96 self-center">
              <Button
                className="px-4 py-2 mr-0 mb-3 sm:mr-3 sm:mb-0 sm:flex-1"
                onPress={() => addProduct(data)}
              >
                <ButtonText size="sm">Add to cart</ButtonText>
              </Button>

              <Button
                variant="outline"
                className="px-4 py-2 border-outline-300 sm:flex-1"
              >
                <ButtonText size="sm" className="text-typography-600">
                  Wishlist
                </ButtonText>
              </Button>
            </Box>

            {
              <Text
                className={
                  (ITEM_IN_CART ? "" : "invisible") + " text-center -mt-5 "
                }
              >
                This item is in your cart with{" "}
                {items[id] && "quantity" in items[id] && items[id].quantity} in
                quantity
              </Text>
            }
          </VStack>
        </Card>
      </View>
    </View>
  );
}
