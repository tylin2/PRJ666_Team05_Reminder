import React from "react";
import styles from "./Login.module.scss";

const Login = (props) => {
  return (
    <>
      <nav className={styles.userNav}>
        <a href="/signup">
          <div className={styles.userNav__iconBox}>
            <span>Sign Up</span>
          </div>
        </a>
        <a href="/login">
          <div className={styles.userNav__iconBox}>
            <span>Log In</span>
          </div>
        </a>
        <div className={styles.userNav__user}>
          <span>Account</span>
        </div>
      </nav>
    </>
  );
};

export default Login;
