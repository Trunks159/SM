import React from "react";
import ShiftFilterSwitches from "./ShiftFilterSwitches";
import ShiftFilterToggle from "./ShiftFilterToggle";

export default function ShiftFilter(props) {
  return props.isDesktop ? (
    <ShiftFilterSwitches {...props} />
  ) : (
    <ShiftFilterToggle {...props} />
  );
}
