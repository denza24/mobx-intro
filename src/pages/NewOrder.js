import React from "react";
import Categories from "../components/Categories";
import SubCategories from "../components/SubCategories";
import Products from "../components/Products";
import OrderDetails from "../components/OrderDetails";
import CartContext from "../store/CartStore";

const NewOrder = () => {
  const cartStore = React.useContext(CartContext);
  let isOrdering;
  if (cartStore.cartItemsCount > 0) {
    isOrdering = true;
  } else {
    isOrdering = false;
  }
  return (
    <>
      <main>
        <Categories />
        <SubCategories />
        <Products />
      </main>
      {isOrdering && <OrderDetails />}
      {/* //
  <OrderDetails /> */}
    </>
  );
};

export default NewOrder;
