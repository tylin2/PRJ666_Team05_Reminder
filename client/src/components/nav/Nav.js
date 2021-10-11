import React from "react";
import styles from "./Nav.module.scss";

const Nav = (props) => {
  return (
    <>
      <nav class={styles.sidebar}>
        <ul class={styles.sideNav}>{props.children}</ul>
      </nav>
    </>
  );
};

export default Nav;
