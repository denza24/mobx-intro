import React from "react";
import { ProductsContext } from "../store/ProductsContext";
import OrderItem from "./OrderItem";

const OrderDetails = () => {
  const cartProducts = React.useContext(ProductsContext);

  return (
    <div className="order-details">
      <h1>Order Summary </h1>
      <ul>
        {cartProducts.cartProducts.map((prod) => (
          <OrderItem key={prod.name} name={prod.name} />
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
