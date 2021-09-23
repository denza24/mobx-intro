import React, { useState, useReducer, useEffect } from "react";
import CartContext from "./CartStore";

export const ProductsContext = React.createContext({
  totalAmount: 0,
  cartProducts: [],
  onAddToCart: () => {},
  onCartItemRemove: () => {},
});

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  let updatedItems;
  let updatedTotalAmount;

  if (action.type === "ADD_ITEM") {
    const itemIndex = state.items.findIndex(
      (item) => item.name === action.item.name
    );
    if (itemIndex >= 0) {
      updatedItems = state.items.map((item, index) => {
        return index === itemIndex
          ? { ...item, amount: item.amount + 1 }
          : item;
      });
    } else {
      //novi item u cartu
      //provjeri da li ima amount
      if (action.item.amount > 0) {
        updatedItems = state.items.concat(action.item);
      } else {
        const newItem = { ...action.item, amount: 1 };
        updatedItems = state.items.concat(newItem);
      }
    }

    updatedTotalAmount = state.totalAmount + action.item.price;
  } else if (action.type === "REMOVE_ITEM") {
    const itemIndex = state.items.findIndex(
      (item) => item.name === action.name
    );
    const updatedItem = state.items.find((item) => item.name === action.name);

    if (updatedItem.amount === 1) {
      updatedItems = state.items.filter(
        (item) => item.name !== updatedItem.name
      );
    } else {
      updatedItems = state.items.map((item, index) => {
        return index === itemIndex
          ? { ...item, amount: item.amount - 1 }
          : item;
      });
    }

    updatedTotalAmount = state.totalAmount - updatedItem.price;
  } else if (action.type === "SET_CART") {
    updatedItems = [...action.cart];
    updatedTotalAmount = action.total;
  }

  return { items: updatedItems, totalAmount: updatedTotalAmount };
};

export const ProductsProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const cartStore = React.useContext(CartContext);

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
    const totalFromLocalStorage = JSON.parse(localStorage.getItem("total"));

    if (cartFromLocalStorage) {
      dispatchCartAction({
        type: "SET_CART",
        cart: cartFromLocalStorage,
        total: totalFromLocalStorage,
      });
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(cartState.items));
      localStorage.setItem("total", JSON.stringify(cartState.totalAmount));
      let itemsCount = 0;

      for (const item of cartState.items) {
        itemsCount += item.amount;
      }
      localStorage.setItem("itemsCount", JSON.stringify(itemsCount));
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cartState]);

  const handleAddToCart = (product) => {
    cartStore.incrementOne();
    dispatchCartAction({ type: "ADD_ITEM", item: product });
  };
  const handleRemoveFromCart = (name) => {
    cartStore.decrementOne();
    dispatchCartAction({ type: "REMOVE_ITEM", name: name });
  };

  const productsContext = {
    cartProducts: cartState.items,
    totalAmount: cartState.totalAmount,
    onAddToCart: handleAddToCart,
    onCartItemRemove: handleRemoveFromCart,
  };
  return (
    <ProductsContext.Provider value={productsContext}>
      {props.children}
    </ProductsContext.Provider>
  );
};

//export const useProductsStore = () => React.useContext(ProductsContext);
