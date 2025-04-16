import { totalOrderPrice } from "@/src/features/orders/orderUtils";
import { IOrder } from "@/src/types/order";
import { Link } from "expo-router";
import { FlatList, TouchableOpacity } from "react-native";
import { Box } from "../../ui/box";
import { Card } from "../../ui/card";
import { Divider } from "../../ui/divider";
import { HStack } from "../../ui/hstack";
import { Text } from "../../ui/text";
import { VStack } from "../../ui/vstack";

function OrderItem({ order }: { order: IOrder }) {
  const totalItems = order.items.length;
  return (
    <Link href={"/orders/" + order.id} asChild>
      <TouchableOpacity className="w-full p-2">
        <VStack className="gap-1">
          <HStack className="justify-between">
            <Text className="hover:text-pretty">
              {" "}
              {new Date(order.createdAt).toDateString()}{" "}
            </Text>
            <Text className="font-bold">
              {" "}
              {totalOrderPrice(order.items)}Rs.
            </Text>
          </HStack>
          <HStack className="justify-between">
            <Text className="text-xs pl-1">
              total {totalItems} Unique {totalItems > 1 ? "Items" : "Item"}
            </Text>
            <Text className="text-xs"> {order.status}</Text>
          </HStack>
        </VStack>
      </TouchableOpacity>
    </Link>
  );
}

export default function ({ orders }: { orders: IOrder[] }) {
  return (
    <Card className="p-0 w-full">
      <VStack>
        <FlatList
          data={orders}
          renderItem={({ item, index }) => (
            <Box>
              <OrderItem order={item} />
              {index + 1 < orders.length && <Divider />}
            </Box>
          )}
        />
      </VStack>
    </Card>
  );
}
