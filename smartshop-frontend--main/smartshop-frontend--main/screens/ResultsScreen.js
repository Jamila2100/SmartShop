import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import ProductCard from "../components/ProductCard";
import { products } from "../data/dummyData";

export default function ResultsScreen() {
  const navigation = useNavigation();

  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  const addToWishlist = (item) => {
    setWishlist([...wishlist, item]);
    Alert.alert("Added to Wishlist ❤️");
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    Alert.alert("Added to Cart 🛒");
  };

  const addReview = (item) => {
    Alert.prompt("Review", `Review for ${item.name}`, (text) => {
      console.log("Review:", text);
    });
  };

  // 🔥 AI SORT
  const sortedProducts = [...products].sort((a, b) => {
    const scoreA = a.rating * 20 - a.price / 1000;
    const scoreB = b.rating * 20 - b.price / 1000;
    return scoreB - scoreA;
  });

  return (
    <View style={{ flex: 1, padding: 10 }}>
      
      {/* TOP NAV */}
      <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 10 }}>
        <Text onPress={() => navigation.navigate("Wishlist", { wishlist })}>❤️ Wishlist</Text>
        <Text onPress={() => navigation.navigate("Cart", { cart })}>🛒 Cart</Text>
        <Text onPress={() => navigation.navigate("Orders")}>📦 Orders</Text>
      </View>

      <FlatList
        data={sortedProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            onWishlist={addToWishlist}
            onCart={addToCart}
            onReview={addReview}
          />
        )}
      />
    </View>
  );
}