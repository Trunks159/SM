import { Button } from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";
import React from "react";

const IconBtn = ({ baseObj, changeActivePage, label, activePage, classes }) => {
  return (
    <div className = {classes.btnDiv}>
      <p className = {classes.p}
        style={{
          color:
            baseObj.id === activePage ? baseObj.active.color : baseObj.reg.color,
        }}
      >
        {label}
      </p>
      <Button onClick={() => changeActivePage(baseObj.id)}>
        <img
          src={baseObj.id === activePage ? baseObj.active.img : baseObj.reg.img}
        />
      </Button>
    </div>
  );
};

export default IconBtn;
