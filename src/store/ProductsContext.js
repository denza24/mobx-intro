import React, { useState } from "react";

export const ProductsContext = React.createContext({
  selectedCategoryId: 0,
  selectedSubCategoryId: 0,
  cartProducts: [],
  onCategorySelect: () => {},
  onSubCategorySelect: () => {},
});

export const ProductsProvider = (props) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);

  const handleCategorySelect = (id) => {
    setSelectedSubCategoryId(0);
    setSelectedCategoryId(id);
  };
  const handleSubCategorySelect = (id) => {
    setSelectedSubCategoryId(id);
  };
  const handleAddToCart = (product) => {
    console.log("Product to Add: ", product);

    setCartProducts((prev) => {
      console.log("Cart items: ", prev);
      if (prev.find) return [...prev, product];
    });
  };
  const isSelectedCategory = (id) => {
    return selectedCategoryId === id;
  };
  return (
    <ProductsContext.Provider
      value={{
        selectedCategoryId: selectedCategoryId,
        selectedSubCategoryId: selectedSubCategoryId,
        cartProducts: cartProducts,
        onCategorySelect: handleCategorySelect,
        onSubCategorySelect: handleSubCategorySelect,
        isSelectedCategory: isSelectedCategory,
        onAddToCart: handleAddToCart,
      }}
    >
      {props.children}
    </ProductsContext.Provider>
  );
};

//export const useProductsStore = () => React.useContext(ProductsContext);
