import { Text } from "@/src/components/ui/text";
import { ICartItem } from "../hooks/useCart";
import { Card } from "@/src/components/ui/card";
import { HStack } from "@/src/components/ui/hstack";
import { VStack } from "@/src/components/ui/vstack";
import { Image } from "@/src/components/ui/image";
import { Heading } from "@/src/components/ui/heading";
import { Link } from "expo-router";

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
