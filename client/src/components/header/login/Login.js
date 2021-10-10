import React from "react";
import styles from "./Login.module.scss";
import Signup from "../../../pages/user/Signup";
import LoginComp from "../../../pages/user/Login";

import {Switch, Route, Link} from "react-router-dom";

const Login = (props) => {
  return (
    <>
      <nav className={styles.userNav}>
        <div className={styles.userNav__iconBox}>
          <a href="/signup"><span>Sign Up</span></a>
        </div>
        <div className={styles.userNav__iconBox}>
          <a href="/login"><span>Log In</span></a>
        </div>
        <div className={styles.userNav__user}>
          <span>Account</span>
        </div>
      </nav>
    </>
  );
};

export default Login;
