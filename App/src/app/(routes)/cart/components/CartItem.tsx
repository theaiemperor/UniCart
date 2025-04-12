import { Card } from "@/src/components/ui/card";
import { Heading } from "@/src/components/ui/heading";
import { HStack } from "@/src/components/ui/hstack";
import { Image } from "@/src/components/ui/image";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { Link } from "expo-router";
import { ICartItem } from "../hooks/useCart";

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
            className="cursor-pointer w-max"
            href={"/products/" + productInfo.id}
            asChild
          >
            <Heading>{productInfo.name}</Heading>
          </Link>
          <Text>
            Total {productInfo.quantity} @{productInfo.price}Rs.
          </Text>
        </VStack>
        <Heading>
          {(productInfo.quantity * productInfo.price).toFixed(2)} Rs.
        </Heading>
      </HStack>
    </Card>
  );
}
