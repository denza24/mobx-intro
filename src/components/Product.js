import React from "react";
import Card from "./Card";

const Product = ({ product, onClick }) => {
  return (
    <Card onClick={onClick}>
      <img src={product.imageUrl} alt="product" />
      <h3>{product.name}</h3>
      <span>{product.price}</span>
    </Card>
  );
};

export default Product;
