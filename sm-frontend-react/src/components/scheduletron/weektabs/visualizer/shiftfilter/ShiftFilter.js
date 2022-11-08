import React from "react";
import { useSelector } from "react-redux";
import ShiftFilterSwitches from "./ShiftFilterSwitches";
import ShiftFilterToggle from "./ShiftFilterToggle";

export default function ShiftFilter(props) {
  const screenWidth = useSelector(state=>state.screenWidth);
  const isDesktop = screenWidth >= 600;
  return isDesktop ? (
    <ShiftFilterSwitches {...props} />
  ) : (
    <ShiftFilterToggle {...props} />
  );
}
