import React from "react";
import daysIcon from "./assets/Days Icon.svg";
import searchIcon from "./assets/Search Icon.svg";
import settingsIcon from "./assets/Settings Icon.svg";
import { StyledTabs, StyledTab, StyledDivider } from "./StyledTabs";

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
      currentMenu={menu}
      icon={<img src={daysIcon} />}
    />
    <StyledTab
      label={"Search"}
      value={"search"}
      currentMenu={menu}
      icon={<img src={searchIcon} />}
    />
    <StyledTab
      currentMenu={menu}
      label={"Settings"}
      value={"settings"}
      icon={<img src={settingsIcon} />}
    />
  </StyledTabs>
);
export default Tabs2;
