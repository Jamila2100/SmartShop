import { Text, View } from "react-native";

export default function OrdersScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>📦 Previous Orders</Text>
      <Text>No orders yet</Text>
    </View>
  );
}