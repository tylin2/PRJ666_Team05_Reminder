import React, { useState, useEffect } from "react";

import Account from "./Account";
import Login from "./Login";

const AuthNav = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setIsAuth(true);
    }
  }, []);

  return <>{isAuth ? <Account /> : <Login />}</>;
};



export default AuthNav;