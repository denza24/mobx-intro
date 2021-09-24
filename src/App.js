import React from "react";
import "./App.css";
import { observer } from "mobx-react";

import { Route } from "react-router-dom";
import Tables from "./pages/Tables";
import NewOrder from "./pages/NewOrder";

function App() {
  return (
    <div className="app">
      <Route exact path="/" component={Tables} />
      <Route path="/newOrder" component={NewOrder} />
    </div>
  );
}

export default observer(App);
