import React from "react";
import styles from "./Body.module.scss";

const Body = (props) => {
  return (
    <>
      <div class={styles.body}>{props.children}</div>
    </>
  );
};

export default Body;
