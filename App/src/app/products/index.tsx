import React from "react";
import { FlatList, View, Platform, Text } from "react-native";
import ProductItem from "./components/ProductItems";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/src/components/ui/spinner";
import { useBreakpointValue } from "@/src/components/ui/utils/use-break-point-value";

import { fetchAllProducts } from "./logic/productsApi";

export default function () {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  const isWeb = Platform.OS === "web";

  const itemsInRow = useBreakpointValue({
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
  }) as number;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center">
        <Spinner size={"large"} />
      </View>
    );
  }
  if (!data || data.length === 0 || isError) {
    return (
      <>
        <View className="h-full flex justify-center items-center ">
          <Text className="text-xl md:text-5xl font-bold">
            {isError ? "Something went wrong!" : "Nothing found!"}
          </Text>
        </View>
      </>
    );
  }

  return (
    <FlatList
      key={itemsInRow}
      data={data}
      className={`p-2 ${isWeb && "h-screen "}`}
      numColumns={itemsInRow}
      contentContainerClassName="gap-3"
      columnWrapperClassName={
        itemsInRow > 1
          ? `gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 `
          : undefined
      }
      renderItem={({ item }) => <ProductItem {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
