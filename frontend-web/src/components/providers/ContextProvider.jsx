import { createContext, useContext, useState } from "react";

const cartContext = createContext();

export const useCartContext = () => {
  const context = useContext(cartContext);
  if (!context) throw new Error("createContext is missing!");
  return context;
};

const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState("");

  return (
    <cartContext.Provider value={{ cartData, setCartData }}>
      {children}
    </cartContext.Provider>
  );
};

export default CartContextProvider;
