import React, { createContext, useState, useEffect, useCallback } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, qty: item.qty ? item.qty + 1 : 1 }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const removeDuplicates = useCallback(() => {
    const uniqueCart = cart.filter((product, index) => {
      return cart.findIndex((p) => p.id === product.id) === index;
    });
    setCart(uniqueCart);
  }, [cart]);

  useEffect(() => {
    removeDuplicates();
  }, [cart, removeDuplicates]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, removeDuplicates, setCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
