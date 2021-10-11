import React from "react";
import styles from "./Input.module.scss";

const Input = (props) => {
  let renderComp = <h1>Wrong Input Type!!</h1>;

  if (props.type == null) {
    renderComp = (
      <input
        type="text"
        onChange={props.onChangeHandler}
        class={styles.textInput}
        placeholder={props.placeholder}
      />
    );
  } else if (props.type === "date") {
    renderComp = (
      <input
        type="date"
        onChange={props.onChangeHandler}
        class={styles.dateInput}
        placeholder={props.placeholder}
      />
    );
  } else {
    renderComp = (
      <input
        type={props.type}
        onChange={props.onChangeHandler}
        class={styles.textInput}
        placeholder={props.placeholder}
      />
    );
  }

  return <>{renderComp}</>;
};

export default Input;
