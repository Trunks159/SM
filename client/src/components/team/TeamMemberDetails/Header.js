import React from "react";

function Header({ firstName, lastName, username, isHidden }) {
  return (
    <div className="header" style={{ display: isHidden ? "none" : "flex" }}>
      <div className="circle-background">
        <h1>{username ? username.charAt(0) : firstName.charAt(0)}</h1>
      </div>
      <div className="info">
        <h2>{username || firstName}</h2>
        <h4>View edit your info here</h4>
      </div>
    </div>
  );
}

export default Header;
