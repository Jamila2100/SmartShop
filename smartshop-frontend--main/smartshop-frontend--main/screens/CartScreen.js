import { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/AppContext";

export default function CartScreen() {
  const { cart, setCart } = useContext(AppContext);

  const removeItem = (item) => {
    setCart(cart.filter((i) => i.id !== item.id));
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20 }}>🛒 Cart</Text>

      {cart.length === 0 ? (
        <Text style={{ marginTop: 20 }}>Cart is empty</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard item={item} onRemove={removeItem} />
          )}
        />
      )}
    </View>
  );
}