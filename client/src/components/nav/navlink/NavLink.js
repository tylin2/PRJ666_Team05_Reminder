import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavLink.module.scss";

const NavLink = (props) => {
  const [isActive, setIsActive] = useState(false);

  // This should be changed...
  // Instead of checking click, checking the URL history
  const clickHandler = (e) => {
    setIsActive(true);
  };

  return (
    <>
      <li
        className={
          isActive
            ? styles.sideNavItem + " " + styles.sideNavItemActive
            : styles.sideNavItem
        }
      >
        {" "}
        <Link
          onClick={clickHandler}
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
