import { Card } from "@/src/components/ui/card";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { IProduct } from "@/src/types/products";
import { Link } from "expo-router";
import { Image, TouchableOpacity } from "react-native";

export default function (props: IProduct) {
  return (
    <Link
      href={"/products/" + props.id}
      asChild
      className="w-full self-center cursor-pointer"
    >
      <TouchableOpacity>
        <Card className="w-full h-80 shadow-soft-1">
          <Image
            source={{ uri: props.image }}
            className="w-full h-48 flex-1 "
            resizeMode="contain"
          />
          <VStack className="p-4 px-2 ">
            <Text>{props.price} Rs</Text>
            <Heading size="sm">{props.name}</Heading>
          </VStack>
        </Card>
      </TouchableOpacity>
    </Link>
  );
}
