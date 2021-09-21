import React from "react";
import classes from "./Button.module.css";

const Button = (props) => {
  const btnClasses = `${classes.button} ${props.active ? classes.active : ""}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
      {props.text}
    </button>
  );
};

export default Button;
