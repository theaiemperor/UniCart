import { TouchableOpacity, View } from "react-native";
import { Icon } from "../../../components/ui/icon/index.web";
import { ShoppingCart } from "lucide-react-native";
import { Link } from "expo-router";
import useCart from "../hooks/useCart";
import { Text } from "@/src/components/ui/text";

export default function CartButton() {
  const { totalQuantity } = useCart((state) => state.meta);

  return (
    <View className="relative">
      <Link href="/cart" asChild>
        <TouchableOpacity className="relative">
          <Icon as={ShoppingCart} className="text-black w-6 h-6" />
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
