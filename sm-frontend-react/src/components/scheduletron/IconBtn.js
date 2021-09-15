import { Button } from "@material-ui/core";
import { mergeClasses } from "@material-ui/styles";
import React from "react";

const IconBtn = ({ baseObj, changeActiveBtn, label, activeBtn, classes }) => {
  console.log("Baseobj: ", baseObj);
  return (
    <div className = {classes.btnDiv}>
      <p className = {classes.p}
        style={{
          color:
            baseObj.id === activeBtn ? baseObj.active.color : baseObj.reg.color,
        }}
      >
        {label}
      </p>
      <Button onClick={() => changeActiveBtn(baseObj.id)}>
        <img
          src={baseObj.id === activeBtn ? baseObj.active.img : baseObj.reg.img}
        />
      </Button>
    </div>
  );
};

export default IconBtn;
