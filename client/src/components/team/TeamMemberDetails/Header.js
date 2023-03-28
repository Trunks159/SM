import React from "react";

function Header({ firstName, text1, text2, isHidden }) {
  return (
    <div className="header" style={{ display: isHidden ? "none" : "flex" }}>
      <div className="circle-background">
        <h1>{firstName.charAt(0)}</h1>
      </div>

      <div className="info">
        <h2>{text1}</h2>
        <h4>{text2}</h4>
      </div>
    </div>
  );
}

export default Header;
