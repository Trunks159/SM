import React, { Component } from "react";

const MenuContent = ({ menu, value, children }) => (
  <div style={{ display: menu === value ? "flex" : "none" }}>{children}</div>
);

export default MenuContent;
