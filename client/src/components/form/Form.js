import React from "react";
import styles from "./Form.module.scss";

const Form = (props) => {
  return (
    <>
      {" "}
      <form class={styles.search}>
        {props.children}
      </form>
    </>
  );
};

export default Form;
