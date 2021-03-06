import React from "react";
import styles from "./Login.module.scss";
import { auth } from "../../../firebase";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Account =  (props) => {
  const history = useHistory();
  const signOut = (e) => {
    e.preventDefault();
    auth.signOut();
    window.localStorage.removeItem("token")
    window.location.reload(true);
  };
  return (
    <>
      <nav className={styles.userNav}>
        <Link to="/signout" onClick={signOut}>
          <div className={styles.userNav__iconBox}>
            <span>Sign Out</span>
          </div>
        </Link>
        <Link to="/account">
          <div className={styles.userNav__iconBox}>
            <span>Account</span>
          </div>
        </Link>
      </nav>
    </>
  );
};

export default Account;
