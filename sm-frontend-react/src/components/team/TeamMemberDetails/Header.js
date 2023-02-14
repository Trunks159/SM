import React from "react";

function Header({ firstName, lastName, username }) {
  return (
    <div className="header">
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
