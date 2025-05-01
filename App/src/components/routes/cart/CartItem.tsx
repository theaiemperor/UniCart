import { Card } from "@/src/components/ui/card";
import { HStack } from "@/src/components/ui/hstack";
import { Image } from "@/src/components/ui/image";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { Link } from "expo-router";
import { ICartItem } from "../../../features/cart/useCart";

interface Props extends ICartItem {
  id: string;
}

export default function (productInfo: Props) {
  return (
    <Card className="p-2 px-4 w-full ">
      <HStack className="gap-5 items-center">
        <Image
          source={{ uri: productInfo.image }}
          resizeMode="contain"
          className="w-16"
          alt={productInfo.name}
        />
        <VStack className="flex-1">
          <Link
            className="cursor-pointer w-max max-w-fit"
            href={"/products/" + productInfo.id}
            asChild
          >
            <Text className="text-lg font-bold ">{productInfo.name}</Text>
          </Link>
          <Text>
            Total {productInfo.quantity} @{productInfo.price}Rs.
          </Text>
        </VStack>
        <Text className="text-xl font-bold">
          {(productInfo.quantity * productInfo.price).toFixed(2)} Rs.
        </Text>
      </HStack>
    </Card>
  );
}
