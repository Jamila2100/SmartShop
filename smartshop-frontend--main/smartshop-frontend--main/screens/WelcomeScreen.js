import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

const { height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>

      <View style={styles.top} />

      <View style={styles.bottom}>
        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.subtitle}>
          Discover premium shopping experience
        </Text>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate("Auth")}
        >
          <Text style={styles.arrow}>→</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fddbd0" },

  top: {
    height: height * 0.6,
    backgroundColor: "#f48c8c",
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80
  },

  bottom: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },

  title: { fontSize: 28, fontWeight: "600" },

  subtitle: { color: "#777", marginTop: 10 },

  btn: {
    marginTop: 30,
    backgroundColor: "#f48c8c",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end"
  },

  arrow: { color: "#fff", fontSize: 22 }
});