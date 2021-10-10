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
          <Link to="/signup">Sign Up</Link>
        </div>
        <div className={styles.userNav__iconBox}>
          <Link to="/login">Log In</Link>
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
