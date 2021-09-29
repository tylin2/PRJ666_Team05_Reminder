import React from "react";
import styles from "./Container.module.scss";

const Container = (props) => {
  return (
    <>
      <div class={styles.container}>{props.children}</div>
    </>
  );
};

export default Container;
