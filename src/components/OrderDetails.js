import React from "react";
import { observer } from "mobx-react-lite";
import CartContext from "../store/CartStore";
import OrderItem from "./OrderItem";

const OrderDetails = () => {
  const cartStore = React.useContext(CartContext);
  //load cart items on first component load
  React.useEffect(() => {
    cartStore.loadLocalStorageData();
    // eslint-disable-next-line
  }, []);
  //spremi podatke u local storage

  //kad god se
  React.useEffect(() => {
    const timer = setTimeout(() => {
      cartStore.setLocalStorageData();
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
    //eslint-disable-next-line
  }, [cartStore.cartItemsCount]);

  return (
    <div className="order-details">
      <h1>Order Summary </h1>
      <ul>
        {cartStore.cartItems.map((item) => (
          <OrderItem
            key={item.name}
            name={item.name}
            price={item.price}
            amount={item.amount}
            onClick={() => cartStore.removeItemFromCart(item.name)}
          />
        ))}
      </ul>
      <div className="total">
        <div>
          <span>Total: </span>
          <h3>{cartStore.totalAmount.toFixed(2)}</h3>
          <span className="description">
            Items count: {cartStore.cartItemsCount}
          </span>
        </div>
        <div className="actions">
          <button className="btn-order save">Save</button>
          <button
            onClick={() => cartStore.deleteCart()}
            className="btn-order cancel"
          >
            Cancel{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default observer(OrderDetails);
