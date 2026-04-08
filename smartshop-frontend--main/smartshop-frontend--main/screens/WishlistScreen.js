import { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import ProductCard from "../components/ProductCard";
import { AppContext } from "../context/AppContext";

export default function WishlistScreen() {
  const { wishlist, setWishlist } = useContext(AppContext);

  const removeItem = (item) => {
    setWishlist(wishlist.filter((i) => i.id !== item.id));
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 20 }}>❤️ Wishlist</Text>

      {wishlist.length === 0 ? (
        <Text style={{ marginTop: 20 }}>Wishlist is empty</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard item={item} onRemove={removeItem} />
          )}
        />
      )}
    </View>
  );
}