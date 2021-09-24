import React from "react";
import { Link } from "react-router-dom";
import classes from "./Tables.module.css";

const Tables = () => {
  return (
    <div className={classes.tables}>
      <h1>Tables</h1>
      <ul>
        <div>
          <span>Table 1</span>
          <li>
            <Link to="/neworder"></Link>
          </li>
        </div>
        <div>
          <span>Table 2</span>
          <li></li>
        </div>
        <div>
          <span>Table 3</span>
          <li></li>
        </div>
        <div>
          <span>Table 4</span>
          <li></li>
        </div>
        <div>
          <span>Table 5</span>
          <li></li>
        </div>
      </ul>
    </div>
  );
};

export default Tables;
