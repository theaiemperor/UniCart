import { Icon } from "@/src/components/ui/icon";
import { Text } from "@/src/components/ui/text";
import { Link } from "expo-router";
import { ShoppingCart } from "lucide-react-native";
import { TouchableOpacity, View } from "react-native";
import useCart from "../../../features/cart/useCart";

export default function CartButton(props: any) {
  const { totalQuantity } = useCart((state) => state.meta);

  return (
    <View className="relative">
      <Link href="/cart" asChild>
        <TouchableOpacity className="relative">
          <Icon as={ShoppingCart} className="text-black w-6 h-6" {...props} />
          {totalQuantity > 0 && (
            <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 justify-center items-center">
              <Text className="text-white text-xs font-bold">
                {totalQuantity}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Link>
    </View>
  );
}
