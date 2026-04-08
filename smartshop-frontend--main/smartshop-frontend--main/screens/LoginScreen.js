import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const { height } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState("");

  // ✅ AUTO LOGIN
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const parsed = JSON.parse(user);
          navigation.replace("Home", { username: parsed.name });
        }
      } catch (e) {
        console.log(e);
      }
    };
    checkUser();
  }, []);

  // ✅ LOGIN FUNCTION (FIXED)
  const handleLogin = async () => {
    if (!name.trim()) {
      alert("Please enter your name");
      return;
    }

    try {
      const userData = { name };

      await AsyncStorage.setItem("user", JSON.stringify(userData));

      navigation.replace("Home", {
        username: name
      });
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <View style={styles.container}>

      {/* TOP DESIGN */}
      <View style={styles.top} />

      {/* CARD */}
      <View style={styles.card}>

        {/* ✅ APP NAME */}
        <Text style={styles.appName}>SmartShop ✨</Text>

        <Text style={styles.title}>Welcome 👋</Text>

        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          value={name}              // ✅ IMPORTANT FIX
          onChangeText={setName}    // ✅ IMPORTANT FIX
        />

        {/* BUTTON */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdecea"
  },

  top: {
    height: height * 0.4,
    backgroundColor: "#f48c8c",
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: -60,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
    elevation: 10
  },

  appName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#f48c8c"
  },

  title: {
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20
  },

  input: {
    backgroundColor: "#fdf3f1",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15
  },

  button: {
    backgroundColor: "#f48c8c",
    padding: 15,
    borderRadius: 20,
    alignItems: "center"
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});