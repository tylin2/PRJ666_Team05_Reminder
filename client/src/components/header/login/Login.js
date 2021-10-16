import React from "react";
import styles from "./Login.module.scss";
import { Link } from "react-router-dom";

const Login = (props) => {
  return (
    <>
      <nav className={styles.userNav}>
        <Link to="/signup">
          <div className={styles.userNav__iconBox}>
            <span>Sign Up</span>
          </div>
        </Link>
        <Link to="/login">
          <div className={styles.userNav__iconBox}>
            <span>Log In</span>
          </div>
        </Link>              
      </nav>
    </>
  );
};

export default Login;
