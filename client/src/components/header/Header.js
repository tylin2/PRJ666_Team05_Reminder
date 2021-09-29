import React from "react";
import styles from "./Header.module.scss";

const Header = (props) => {
  return (
    <>
      <div class={styles.header}>{props.children}</div>
    </>
  );
};

export default Header;
