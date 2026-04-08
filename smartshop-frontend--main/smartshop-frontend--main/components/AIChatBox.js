import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function AIChatBox({ value, onChange, onSearch }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search product..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />

      <TouchableOpacity onPress={onSearch}>
        <Ionicons name="search" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  input: {
    flex: 1
  }
});