import React from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

const NavBar = props => {
  const date = new Date().toDateString();

  return (
    <Menu secondary className="navbar-container">
      <NavLink to="/">
        <Menu.Item name={date} className="date" />
      </NavLink>
      <Menu.Menu position="right">
        <NavLink to="/journals">
          <Menu.Item name="journals" className="date" />
        </NavLink>
        <NavLink to="/">
          <Menu.Item name="sign up" className="singup" />
        </NavLink>
        <NavLink to="/">
          <Menu.Item name="log in" className="login" />
        </NavLink>
      </Menu.Menu>
    </Menu>
  );
};

export default NavBar;
