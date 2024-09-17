import React from "react";
import './header.css';
import RevokeToken from "../../pages/Test";

interface HeaderProps {
  isAdmin: boolean;
}

const Header = () => {
  return (
    <div className="header">
      <input type="search" />
    </div>
  );
};

export default Header;