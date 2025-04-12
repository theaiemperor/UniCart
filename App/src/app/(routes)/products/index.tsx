import { Box } from "@/src/components/ui/box";
import { Spinner } from "@/src/components/ui/spinner";
import { Text } from "@/src/components/ui/text";
import { useBreakpointValue } from "@/src/components/ui/utils/use-break-point-value";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList } from "react-native";
import ProductItem from "./components/ProductItems";
import { fetchAllProducts } from "./logic/productsApi";

export default function () {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  const itemsInRow = useBreakpointValue({
    sm: 2,
    md: 3,
    lg: 4,
  }) as number;

  if (isLoading) {
    return (
      <Box className="flex-1 justify-center">
        <Spinner size={"large"} />
      </Box>
    );
  }

  if (!data || data.length === 0 || isError) {
    return (
      <Box className="h-full flex justify-center items-center ">
        <Text className="text-xl md:text-5xl font-bold">
          {isError ? "Something went wrong!" : "Nothing found!"}
          {error && JSON.stringify(error)}
        </Text>
      </Box>
    );
  }

  return (
    <FlatList
      key={itemsInRow}
      data={data}
      className={`p-2 w-full self-center`}
      numColumns={itemsInRow}
      contentContainerClassName="gap-3"
      columnWrapperClassName={
        itemsInRow > 1
          ? `gap-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`
          : undefined
      }
      renderItem={({ item }) => <ProductItem {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
