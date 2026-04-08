import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
import { AppProvider } from "./context/AppContext";

// SCREENS
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ResultsScreen from "./screens/ResultsScreen";
import WishlistScreen from "./screens/WishlistScreen";

// THEME
import { darkTheme, lightTheme } from "./theme";

const Stack = createNativeStackNavigator();

export default function App() {
  const systemTheme = useColorScheme();
  const [darkMode, setDarkMode] = useState(systemTheme === "dark");

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: { backgroundColor: theme.card },
            headerTintColor: theme.text,
            headerRight: () => (
              <TouchableOpacity onPress={() => setDarkMode(!darkMode)}>
                <Text style={{ marginRight: 10, fontSize: 18 }}>
                  {darkMode ? "🌙" : "🌞"}
                </Text>
              </TouchableOpacity>
            )
          }}
        >
          {/* LOGIN */}
          <Stack.Screen name="Login" component={LoginScreen} />

          {/* HOME (theme passed safely) */}
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} theme={theme} />}
          </Stack.Screen>

          {/* OTHER SCREENS */}
          <Stack.Screen name="Results" component={ResultsScreen} />
          <Stack.Screen name="Wishlist" component={WishlistScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Orders" component={OrdersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}