import React from "react";

const NavBar = props => {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="date">DATE</div>
        <div className="links">
          <div className="signup">Sign Up</div>
          <div className="login">Log In</div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
