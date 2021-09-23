import React from "react";
import { observer } from "mobx-react-lite";
import CategoriesContext from "../store/CategoriesStore";
import { ProductsContext } from "../store/ProductsContext";
import Product from "./Product";

const Products = () => {
  const [products, setProducts] = React.useState([]);

  const productsContext = React.useContext(ProductsContext);
  const ctgStore = React.useContext(CategoriesContext);

  React.useEffect(() => {
    const getProducts = async () => {
      const productsFromServer = await fetchProducts();

      setProducts(productsFromServer);
    };
    getProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(
      "https://api.jsonbin.io/b/6149c12caa02be1d444c3b07"
    );
    const data = await res.json();

    return data;
  };

  let productsToMap = [];
  const subId = ctgStore.selectedSubCategoryId;
  if (subId) {
    productsToMap = products.filter((prod) => prod.subcategoryId === subId);
  }
  return (
    <section className="products">
      {productsToMap.map((prod) => (
        <Product
          key={prod.name}
          product={prod}
          onClick={() => productsContext.onAddToCart(prod)}
        />
      ))}
    </section>
  );
};

export default observer(Products);
