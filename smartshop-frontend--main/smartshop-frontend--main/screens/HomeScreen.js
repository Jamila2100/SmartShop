import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function HomeScreen({ navigation, route, theme }) {

  const { cart, setCart, wishlist, setWishlist } = useContext(AppContext);

  const username = route?.params?.username || "User";

  const [search, setSearch] = useState("");

  // 🤖 AI STATES
  const [chatVisible, setChatVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const products = [
    {
      id: 1,
      name: "Mobile",
      keywords: ["iphone", "samsung", "phone"],
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
    },
    {
      id: 2,
      name: "Shoes",
      keywords: ["nike", "adidas", "sneakers"],
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
      id: 3,
      name: "Laptop",
      keywords: ["macbook", "dell", "hp"],
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8"
    },
    {
      id: 4,
      name: "Fashion",
      keywords: ["shirt", "clothes", "tshirt"],
      image: "https://images.unsplash.com/photo-1521334884684-d80222895322"
    }
  ];

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.keywords.some((word) =>
      word.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    navigation.replace("Login");
  };

  // 🤖 AI SEND
  const handleSend = async () => {
  if (!message.trim()) return;

  const userMsg = { type: "user", text: message };
  setChat([...chat, userMsg]);

  try {
    const response = await fetch("http://127.0.0.1:8001/chatbot/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        session_id: "1",
        message: message
      })
    });

    const data = await response.json();

    const botMsg = {
  type: "bot",
  products: data.results || [],
  text: data.message
};

    setChat(prev => [...prev, botMsg]);

  } catch (error) {
    console.log(error);

    const errorMsg = {
      type: "bot",
      text: "Error connecting to server"
    };

    setChat(prev => [...prev, errorMsg]);
  }

  setMessage("");
};

  // 📷 TEMP IMAGE BUTTON (SAFE)
  const handleImagePick = () => {
    const userMsg = { type: "user", text: "📷 Image feature coming soon" };
    const botMsg = { type: "bot", text: "Backend image AI will be added here" };

    setChat([...chat, userMsg, botMsg]);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>

      <View style={styles.header}>
        <Text style={[styles.greeting, { color: theme.text }]}>
          Hello {username} ✨
        </Text>
        <Text style={[styles.sub, { color: theme.text }]}>
          Discover new arrivals today
        </Text>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={{ color: "red", marginTop: 5 }}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* SEARCH + AI */}
      <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 20 }}>

        <View style={[styles.searchBox, { flex: 1 }]}>
          <TextInput
            placeholder="Search products..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <TouchableOpacity
          style={styles.aiTopButton}
          onPress={() => setChatVisible(!chatVisible)}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>AI</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Wishlist")}>
          <Text>❤️ Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Cart")}>
          <Text>🛒 Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Orders")}>
          <Text>📦 Orders</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.section, { color: theme.text }]}>
        Categories
      </Text>

      {filteredProducts.length === 0 && (
        <Text style={{ marginLeft: 20, marginBottom: 10 }}>
          No results found
        </Text>
      )}

      <View style={styles.grid}>
        {filteredProducts.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.catCard}
            onPress={() => navigation.navigate("Results", { category: item.name })}
          >
            <Image source={{ uri: item.image }} style={styles.img} />
            <Text>{item.name}</Text>

            <TouchableOpacity onPress={() => setCart([...cart, item])}>
              <Text style={{ color: "green" }}>Add to Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setWishlist([...wishlist, item])}>
              <Text style={{ color: "red" }}>Wishlist</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

     <TouchableOpacity
  style={styles.offer}
  onPress={() => navigation.navigate("Results", { category: "Offers" })}
>
  <Text style={{ color: "#fff", fontWeight: "bold" }}>
    🔥 Tap to explore 50% OFF deals
  </Text>
</TouchableOpacity>

      {/* AI CHATBOX */}
      {chatVisible && (
        <View style={styles.chatBox}>
          <ScrollView>
            {chat.map((msg, index) => (
              <Text
                key={index}
                style={{
                  alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.type === "user" ? "#f48c8c" : "#eee",
                  color: msg.type === "user" ? "#fff" : "#000",
                  padding: 8,
                  borderRadius: 10,
                  marginVertical: 4
                }}
              >
                {msg.type === "bot" && msg.products ? (
  <View>
    <Text style={{ fontWeight: "bold" }}>{msg.text}</Text>

    {msg.products.map((p, i) => (
      <View key={i} style={{ marginTop: 5 }}>
        <Text>{p.name}</Text>
        <Text>₹{p.price}</Text>

        <Text
          style={{ color: "blue" }}
          onPress={() => {
  if (typeof window !== "undefined") {
    window.open(p.url, "_blank");
  } else {
    Linking.openURL(p.url);
  }
}}
        >
          View Product
        </Text>
      </View>
    ))}
  </View>
) : (
  <Text>{msg.text}</Text>
)}
              </Text>
            ))}
          </ScrollView>

          <View style={{ flexDirection: "row", marginTop: 5, alignItems: "center" }}>

            <TextInput
              placeholder="Ask AI..."
              value={message}
              onChangeText={setMessage}
              style={styles.chatInput}
            />

            <TouchableOpacity onPress={handleImagePick}>
              <Text style={{ marginHorizontal: 8 }}>📷</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSend}>
              <Text style={{ color: "#f48c8c" }}>Send</Text>
            </TouchableOpacity>

          </View>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20 },
  greeting: { fontSize: 24, fontWeight: "bold" },
  sub: { marginTop: 5 },

  searchBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 20
  },

  aiTopButton: {
    marginLeft: 10,
    backgroundColor: "#f48c8c",
    padding: 12,
    borderRadius: 15
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15
  },

  section: {
    marginLeft: 20,
    fontWeight: "bold",
    marginBottom: 10
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },

  catCard: {
    width: "40%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center"
  },

  img: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5
  },

  offer: {
    backgroundColor: "#ff6b6b",
    margin: 20,
    padding: 15,
    borderRadius: 20,
    alignItems: "center"
  },

  chatBox: {
    position: "absolute",
    bottom: 80,
    left: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    maxHeight: 300,
    elevation: 10
  },

  chatInput: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    padding: 8,
    borderRadius: 10
  }
});