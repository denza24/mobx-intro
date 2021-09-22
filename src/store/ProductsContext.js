import React, { useState, useReducer, useEffect } from "react";

export const ProductsContext = React.createContext({
  selectedCategoryId: 0,
  selectedSubCategoryId: 0,
  totalAmount: 0,
  cartProducts: [],
  onCategorySelect: () => {},
  onSubCategorySelect: () => {},
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
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(0);
  // const [cartProducts, setCartProducts] = useState([]);
  // const [totalAmount, setTotalAmount] = useState(0);
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  useEffect(() => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart"));
    const totalFromLocalStorage = JSON.parse(localStorage.getItem("total"));

    if (cartFromLocalStorage) {
      // cartFromLocalStorage.forEach((element) => {
      //   dispatchCartAction({ type: "ADD_ITEM", item: element });
      // });
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
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cartState]);

  const handleCategorySelect = (id) => {
    setSelectedSubCategoryId(0);
    setSelectedCategoryId(id);
  };
  const handleSubCategorySelect = (id) => {
    setSelectedSubCategoryId(id);
  };
  const handleAddToCart = (product) => {
    dispatchCartAction({ type: "ADD_ITEM", item: product });

    //setTotalAmount((prev) => prev + product.price);

    // setCartProducts((prev) => {
    //   let productIndex = prev.findIndex((prod) => prod.name === product.name);
    //   console.log("Cart", prev);

    //   if (productIndex >= 0) {
    //     console.log("Proizvod je vec u narudzbi, povecaj kolicinu");

    //     let updCart = prev.slice();

    //     // let updCart = [...prev];
    //     // console.log("Cart before update", updCart);
    //     const a = prev[productIndex].amount;
    //     updCart[productIndex].amount = a + 1;

    //     return [...updCart];
    //   } else {
    //     // console.log("novi proizvod...", [...prev, product]);
    //     const newProduct = { ...product, amount: 1 };
    //     return [...prev, newProduct];
    //   }
    // });
  };
  const handleRemoveFromCart = (name) => {
    dispatchCartAction({ type: "REMOVE_ITEM", name: name });
    // console.log("remove item from cart");
    // const productIndex = cartProducts.findIndex((p) => p.name === name);

    // setTotalAmount((prevTotal) => {
    //   return prevTotal - cartProducts[productIndex].price;
    // });
    // setCartProducts((prevCart) => {
    //   if (productIndex >= 0) {
    //     let updCart;
    //     if (prevCart[productIndex].amount === 1) {
    //       //remove from cart
    //       updCart = prevCart.filter((p) => p.name !== name);
    //     } else {
    //       updCart = [...prevCart];
    //       updCart[productIndex].amount -= 1;
    //     }

    //     return [...updCart];
    //   }
    // });
  };
  const isSelectedCategory = (id) => {
    return selectedCategoryId === id;
  };
  const productsContext = {
    selectedCategoryId: selectedCategoryId,
    selectedSubCategoryId: selectedSubCategoryId,
    onCategorySelect: handleCategorySelect,
    onSubCategorySelect: handleSubCategorySelect,
    isSelectedCategory: isSelectedCategory,
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
