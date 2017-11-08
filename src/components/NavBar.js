import React from "react";
import { Input, Menu } from "semantic-ui-react";

const NavBar = props => {
  const date = new Date().toDateString();
  return (
    <Menu secondary className="navbar-container">
      <Menu.Item name={date} className="date" />
      <Menu.Menu position="right">
        <Menu.Item name="journals" className="date" />
        <Menu.Item name="sign up" className="singup" />
        <Menu.Item name="log in" className="login" />
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
