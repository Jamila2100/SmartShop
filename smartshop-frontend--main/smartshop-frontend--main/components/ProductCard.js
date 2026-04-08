import {
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function ProductCard({
  item,
  onWishlist,
  onCart,
  onRemove,
  onReview
}) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <Text style={styles.name}>{item.name}</Text>
      <Text>Price: ₹{item.price}</Text>
      <Text>Rating: ⭐ {item.rating}</Text>

      {/* Add buttons */}
      <View style={styles.row}>
        {onWishlist && (
          <TouchableOpacity style={styles.btnPink} onPress={() => onWishlist(item)}>
            <Text style={styles.text}>❤️ Wishlist</Text>
          </TouchableOpacity>
        )}

        {onCart && (
          <TouchableOpacity style={styles.btnBlue} onPress={() => onCart(item)}>
            <Text style={styles.text}>🛒 Cart</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Remove */}
      {onRemove && (
        <TouchableOpacity style={styles.removeBtn} onPress={() => onRemove(item)}>
          <Text style={styles.text}>❌ Remove</Text>
        </TouchableOpacity>
      )}

      {/* Review */}
      {onReview && (
        <TouchableOpacity style={styles.reviewBtn} onPress={() => onReview(item)}>
          <Text style={styles.text}>⭐ Review</Text>
        </TouchableOpacity>
      )}

      {/* Buy */}
      <TouchableOpacity style={styles.buyBtn} onPress={() => Linking.openURL(item.link)}>
        <Text style={styles.text}>Buy Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, marginVertical: 10, backgroundColor: "#fff", borderRadius: 10 },
  image: { width: "100%", height: 150, marginBottom: 10 },
  name: { fontWeight: "bold", fontSize: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  btnPink: { backgroundColor: "pink", padding: 8, borderRadius: 5 },
  btnBlue: { backgroundColor: "blue", padding: 8, borderRadius: 5 },
  removeBtn: { backgroundColor: "red", padding: 8, marginTop: 8, borderRadius: 5 },
  reviewBtn: { backgroundColor: "orange", padding: 8, marginTop: 8, borderRadius: 5 },
  buyBtn: { backgroundColor: "green", padding: 10, marginTop: 10, borderRadius: 5 },
  text: { color: "white", textAlign: "center" }
});