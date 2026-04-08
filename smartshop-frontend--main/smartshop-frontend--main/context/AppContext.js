import { createContext, useState } from "react";

// 🔹 Create Context
export const AppContext = createContext();

// 🔹 Create Provider
export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  return (
    <AppContext.Provider value={{ cart, setCart, wishlist, setWishlist }}>
      {children}
    </AppContext.Provider>
  );
};