import React from "react";

const OrderItem = (props) => {
  return (
    <li className="order-item" onClick={props.onClick}>
      <div>
        <h3 className="title"> {props.name}</h3>
        <span className="price"> {props.price.toFixed(2)}</span>{" "}
      </div>

      <span className="amount">{props.amount}</span>
    </li>
  );
};

export default OrderItem;
