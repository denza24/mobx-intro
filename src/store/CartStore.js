import { observable, action, makeObservable } from "mobx";
import { createContext } from "react";

class CartStore {
  cartItemsCount = 0;
  cartItems = [];
  constructor() {
    makeObservable(this, {
      cartItems: observable,
      cartItemsCount: observable,
      incrementOne: action,
      decrementOne: action,
      addItemToCart: action,
      removeItemFromCart: action,
      loadItemsCount: action,
    });
  }
  incrementOne = () => {
    this.cartItemsCount++;
  };
  decrementOne = () => {
    this.cartItemsCount--;
  };
  addItemToCart = (item) => {
    this.cartItems.push(item);
  };
  removeItemFromCart = (name) => {
    this.cartItems = this.cartItems.filter((item) => item.name !== name);
  };
  loadItemsCount = () => {
    this.cartItemsCount = localStorage.getItem("itemsCount");
  };
}

const CartContext = createContext(new CartStore());
CartContext.displayName = "CartContext";

export default CartContext;
