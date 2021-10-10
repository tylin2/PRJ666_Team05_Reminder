import React from "react";
import styles from "./Login.module.scss";
import Signup from "../../../pages/user/Signup";
import LoginComp from "../../../pages/user/Login";

import {Switch, Route} from "react-router-dom";

const Login = (props) => {
  return (
    <>
      <nav className={styles.userNav}>
        <div className={styles.userNav__iconBox}>
          <span href="/signup">Signup</span>
        </div>
        <div className={styles.userNav__iconBox}>
          <span href="/login">Login</span>
        </div>
        <div className={styles.userNav__user}>
          <span>Account</span>
        </div>
      </nav>
      <Switch>                       
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <LoginComp />
        </Route>
      </Switch>
    </>
  );
};

export default Login;
