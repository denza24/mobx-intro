import React from "react";
import { observer } from "mobx-react-lite";
import CategoriesContext from "../store/CategoriesStore";
import ProductsContext from "../store/ProductsStore";
import Product from "./Product";
import CartContext from "../store/CartStore";

const Products = () => {
  const ctgStore = React.useContext(CategoriesContext);
  const productsStore = React.useContext(ProductsContext);
  const cartStore = React.useContext(CartContext);

  React.useEffect(() => {
    productsStore.getProductsAsync();
    //eslint-disable-next-line
  }, []);

  let productsToMap = [];
  const subId = ctgStore.selectedSubCategoryId;
  if (subId) {
    productsToMap = productsStore.products.filter(
      (prod) => prod.subcategoryId === subId
    );
  }
  return (
    <section className="products">
      {productsToMap.map((prod) => (
        <Product
          key={prod.name}
          product={prod}
          onClick={() => cartStore.addItemToCart(prod)}
        />
      ))}
    </section>
  );
};

export default observer(Products);
