import { observable, action, makeObservable } from "mobx";
import { createContext } from "react";

class CartStore {
  cartItemsCount = 0;
  cartItems = [];
  totalAmount = 0;

  constructor() {
    makeObservable(this, {
      cartItems: observable,
      cartItemsCount: observable,
      totalAmount: observable,
      incrementOne: action,
      decrementOne: action,
      addItemToCart: action,
      removeItemFromCart: action,
      loadLocalStorageData: action,
      setLocalStorageData: action,
      deleteCart: action,
    });
  }
  incrementOne = () => {
    this.cartItemsCount++;
  };
  decrementOne = () => {
    this.cartItemsCount--;
  };
  addItemToCart = (item) => {
    this.incrementOne();
    const itemIndex = this.cartItems.findIndex((i) => i.name === item.name);
    if (itemIndex > -1) {
      this.cartItems[itemIndex].amount += 1;
    } else {
      const newItem = { ...item, amount: 1 };
      this.cartItems.push(newItem);
    }

    this.totalAmount += item.price;
  };
  removeItemFromCart = (name) => {
    this.decrementOne();
    const itemIndex = this.cartItems.findIndex((i) => i.name === name);

    if (itemIndex > -1) {
      const amountToRemove = this.cartItems[itemIndex].price;

      if (this.cartItems[itemIndex].amount > 1) {
        this.cartItems[itemIndex].amount -= 1;
      } else {
        this.cartItems = this.cartItems.filter((item) => item.name !== name);
      }
      this.totalAmount -= amountToRemove;
    }
  };
  loadLocalStorageData = () => {
    //ucitaj podatke iz local storagea
    if (localStorage.length > 0) {
      this.cartItems = JSON.parse(localStorage.getItem("cart"));
      this.totalAmount = JSON.parse(localStorage.getItem("total"));
      this.cartItemsCount = JSON.parse(localStorage.getItem("itemsCount"));
    }
  };
  setLocalStorageData = () => {
    localStorage.setItem("cart", JSON.stringify(this.cartItems));
    localStorage.setItem("total", JSON.stringify(this.totalAmount));
    localStorage.setItem("itemsCount", JSON.stringify(this.cartItemsCount));
  };
  deleteCart = () => {
    this.cartItems = [];
    this.cartItemsCount = 0;
    this.totalAmount = 0;

    localStorage.clear();
  };
}

const CartContext = createContext(new CartStore());
CartContext.displayName = "CartContext";

export default CartContext;
