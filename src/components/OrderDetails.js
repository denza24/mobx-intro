import React from "react";
import { observer } from "mobx-react-lite";
import { ProductsContext } from "../store/ProductsContext";
import CartContext from "../store/CartStore";
import OrderItem from "./OrderItem";

const OrderDetails = () => {
  const prodCtx = React.useContext(ProductsContext);
  const cartStore = React.useContext(CartContext);
  //load cart items on first component load
  React.useEffect(() => {
    cartStore.loadItemsCount();
  }, []);
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
        <div>
          <span>Total: </span>
          <h3>{prodCtx.totalAmount.toFixed(2)}</h3>
        </div>
        <span>Items count: {cartStore.cartItemsCount}</span>
      </div>
    </div>
  );
};

export default observer(OrderDetails);
