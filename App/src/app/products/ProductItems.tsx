import { Card } from "@/src/components/ui/card";
import { Heading } from "@/src/components/ui/heading";
import { Text } from "@/src/components/ui/text";
import { VStack } from "@/src/components/ui/vstack";
import { IProduct } from "@/src/types/products";
import { Image } from "react-native";

export default function (props: IProduct) {
  return (
    <Card className="md:max-w-96 self-center w-full p-2 h-80 md:w-1/2 lg:w-1/3 shadow-soft-1 ">
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
  );
}
