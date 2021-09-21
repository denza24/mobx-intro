import "./App.css";
import { observer } from "mobx-react";
import Categories from "./components/Categories";
import SubCategories from "./components/SubCategories";
import Products from "./components/Products";
import OrderDetails from "./components/OrderDetails";

function App() {
  return (
    <div className="app">
      <main>
        <Categories />
        <SubCategories />
        <Products />
      </main>

      <OrderDetails />
    </div>
  );
}

export default observer(App);
