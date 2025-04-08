import { FlatList, View, Platform } from "react-native";
import ProductItem from "./ProductItems";
import { fetchAllProducts } from "@/src/api/products";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@/src/components/ui/spinner";
import { useBreakpointValue } from "@/src/components/ui/utils/use-break-point-value";

export default function () {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  const isWeb = Platform.OS === "web";

  const itemsInRow = useBreakpointValue({ sm: 2, md: 3, lg: 4 }) as number;

  if (isLoading) {
    return (
      <View className="flex-1 justify-center">
        <Spinner size={"large"} />
      </View>
    );
  }

  return (
    <FlatList
      key={itemsInRow}
      data={data}
      className={`p-2 ${isWeb && "h-screen"}`}
      numColumns={itemsInRow}
      contentContainerClassName="gap-3 "
      columnWrapperClassName={
        itemsInRow > 1
          ? `gap-3 flex justify-center  ${isWeb && "overflow-y-auto "}`
          : undefined
      }
      renderItem={({ item }) => <ProductItem {...item} />}
      keyExtractor={(item) => item.id}
    />
  );
}
