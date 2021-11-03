import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavLink.module.scss";

const NavLink = (props) => {
  // This should be changed...
  // Instead of checking click, checking the URL history

  return (
    <>
      <li
        className={
          props.isActive
            ? styles.sideNavItem + " " + styles.sideNavItemActive
            : styles.sideNavItem
        }
      >
        {" "}
        <Link
          onClick={props.clickPathHandler}
          to={props.href}
          className={styles.sideNavLink}
        >
          {/* <svg className="side-nav__icon">
            <use xlink:href="img/sprite.svg#icon-home"></use>
          </svg> */}
          <span>{props.children}</span>
        </Link>
      </li>
    </>
  );
};

export default NavLink;
