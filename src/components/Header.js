/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import classes from "./Header.module.scss";
import { Link } from "react-router-dom";

import ToggleSwitch from "../components/ToggleSwitch/ToggleSwitch";
import DropdownMenu from "./DropdownMenu";
//import { ReactComponent as CaretIcon } from "../icons/caret.svg";
//import "../styles/dropdownMenu.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const [open, setOpen] = useState(false);
  function NavItem(props) {
    return (
      <li className="nav-item">
        {props.text}
        <a className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
        </a>
        {open && props.children}
      </li>
    );
  }

  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <Link to="/" className={classes.header__content__logo}>
          {("projectName")}
        </Link>
        <nav
          className={`${classes.header__content__nav} ${
            menuOpen && size.width < 768 ? classes.isMenu : ""
          }`}
        >
          <ul>
            <li>
              <a href="/converter" onClick={menuToggleHandler}>
                {("generator")}
              </a>
            </li>
            <li>
              <Link to="/сoloring-a-picture" onClick={menuToggleHandler}>
                {("coloringPicture")}
              </Link>
            </li>
            <li>
              <Link to="/shopping-cart" onClick={menuToggleHandler}>
                {("shoppingCart")}
              </Link>
            </li>
          </ul>
          <NavItem text={("myProfile")} icon={<CaretIcon />}>
            <DropdownMenu />
          </NavItem>
          <ToggleSwitch label=" " />
        </nav>
        <div className={classes.header__content__toggle}>
          {!menuOpen ? (
            <BiMenuAltRight onClick={menuToggleHandler} />
          ) : (
            <AiOutlineClose onClick={menuToggleHandler} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
