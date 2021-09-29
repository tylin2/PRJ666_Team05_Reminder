import React from "react";
import styles from "./Login.module.scss";

const Login = (props) => {
  return (
    <>
      <nav className={styles.userNav}>
        <div className={styles.userNav__iconBox}>
          <span>Login</span>
        </div>
        <div className={styles.userNav__iconBox}>
          <span>Logout</span>
        </div>
        <div className={styles.userNav__user}>
          <span>Account</span>
        </div>
      </nav>
    </>
  );
};

export default Login;
