import { totalOrderPrice } from "@/src/features/orders/orderUtils";
import { IOrder, IOrderItem } from "@/src/types/order";
import { Link } from "expo-router";
import { FlatList, TouchableOpacity } from "react-native";
import ShowData from "../../global/ShowData";
import { Box } from "../../ui/box";
import { Card } from "../../ui/card";
import { Divider } from "../../ui/divider";
import { HStack } from "../../ui/hstack";
import { Text } from "../../ui/text";
import { VStack } from "../../ui/vstack";

function ProductInfo(props: IOrderItem) {
  return (
    <Link href={"/products/" + props.product_id} asChild>
      <TouchableOpacity className="p-1 py-1">
        <VStack>
          <HStack className="justify-between">
            <Text className="font-semibold ">Product {props.product_id}</Text>
            <Text>{(props.quantity * props.price).toFixed(2)} Rs.</Text>
          </HStack>
          <HStack className="justify-between">
            <Text className="text-xs">
              total {props.quantity} {props.quantity > 1 ? "items" : "item"}
            </Text>
            <Text className="text-xs">@{props.price}Rs for each</Text>
          </HStack>
        </VStack>
      </TouchableOpacity>
    </Link>
  );
}

export default function ({ orderInfo }: { orderInfo: IOrder }) {
  return (
    <Card>
      <VStack className="gap-5">
        <ShowData title="Order ID">{orderInfo.id}</ShowData>
        <ShowData title="Date">
          {new Date(orderInfo.createdAt).toDateString()}
        </ShowData>
        <ShowData title="Status">{orderInfo.status}</ShowData>
        <ShowData title="Total Price">
          {totalOrderPrice(orderInfo.items) + " Rs."}
        </ShowData>
        <ShowData title="Total Products">{orderInfo.items.length}</ShowData>
        <ShowData title="Products Detail">
          <Card variant="outline" className="p-0 my-2 border rounded-md">
            {
              <FlatList
                data={orderInfo.items}
                renderItem={({ item, index }) => (
                  <Box>
                    <ProductInfo {...item} />
                    {index + 1 < orderInfo.items.length && <Divider />}
                  </Box>
                )}
              />
            }
          </Card>
        </ShowData>
      </VStack>
    </Card>
  );
}
