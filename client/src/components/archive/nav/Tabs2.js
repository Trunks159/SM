import React from "react";
import daysIcon from "./assets/Days Icon.svg";
import searchIcon from "./assets/Search Icon.svg";
import settingsIcon from "./assets/Settings Icon.svg";
import { StyledTabs, StyledTab, StyledDivider } from "./StyledTabs";
import { Tab } from "@mui/material";

const Tabs2 = ({ menu, changeMenu }) => (
  <StyledTabs
    style={{ marginTop: "auto" }}
    onChange={changeMenu}
    value={menu}
    orientation={"vertical"}
  >
    <StyledDivider />
    <StyledTab
      label={"Days"}
      value={"days"}
      icon={<img alt="days" src={daysIcon} />}
    />
    <StyledTab
      label={"Search"}
      value={"search"}
      icon={<img alt="search" src={searchIcon} />}
    />
    <StyledTab
      label={"Settings"}
      value={"settings"}
      icon={<img alt="settings" src={settingsIcon} />}
    />
    <Tab style={{ display: "none" }} value={null} />
  </StyledTabs>
);
export default Tabs2;
