import { createContext, useState } from "react";

const CartContext = createContext();

// Manage the product data for the store
const [product, setProduct] = useState("");

return (
  <CartContext.Provider value={{ product, setProduct }}>
    {children}
  </CartContext.Provider>
);

export default CartContext;
