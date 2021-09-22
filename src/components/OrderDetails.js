import React from "react";
import { ProductsContext } from "../store/ProductsContext";
import OrderItem from "./OrderItem";

const OrderDetails = () => {
  const prodCtx = React.useContext(ProductsContext);

  return (
    <div className="order-details">
      <h1>Order Summary </h1>
      <ul>
        {prodCtx.cartProducts.map((item) => (
          <OrderItem
            key={item.name}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onClick={() => prodCtx.onCartItemRemove(item.name)}
          />
        ))}
      </ul>
      <div className="total">
        <span>Total: </span>
        <h3>{prodCtx.totalAmount.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default OrderDetails;
