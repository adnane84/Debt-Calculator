import React from "react";
import logo from "./img/logo.jpg";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="Logo" className="header__logo"/>
      <h1 className="header__title">Loan Calculator</h1>
    </header>
  );
};

export default Header;
