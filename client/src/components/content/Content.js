import React from "react";
import styles from "./Content.module.scss";

const Content = (props) => {
  return (
    <>
      <div class={styles.content}>{props.children}</div>
    </>
  );
};

export default Content;
