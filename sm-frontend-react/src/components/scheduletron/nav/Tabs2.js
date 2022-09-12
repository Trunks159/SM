import React from "react";
import daysIcon from "./assets/Days Icon.svg";
import searchIcon from "./assets/Search Icon.svg";
import settingsIcon from "./assets/Settings Icon.svg";
import { Divider } from "@mui/material";
import { StyledTabs, StyledTab } from "./StyledTabs";

const Tabs2 = ({ menu, changeMenu }) => {
  return (
    <StyledTabs onChange={changeMenu} value={menu} orientation={"vertical"}>
      <Divider
        style={{ background: "#71828B", width: "90%", marginBottom: 15 }}
      />
      <StyledTab
        style={{ opacity: menu === "days" ? 1 : 0.75 }}
        label={
          <p style={{ visibility: menu === "days" ? "visible" : "hidden" }}>
            Days
          </p>
        }
        value={"days"}
        icon={<img src={daysIcon} />}
      />
      <StyledTab
        style={{ opacity: menu === "search" ? 1 : 0.75 }}
        label={
          <p style={{ visibility: menu === "search" ? "visible" : "hidden" }}>
            Search
          </p>
        }
        value={"search"}
        icon={<img src={searchIcon} />}
      />
      <StyledTab
        style={{ opacity: menu === "settings" ? 1 : 0.75 }}
        label={
          <p style={{ visibility: menu === "settings" ? "visible" : "hidden" }}>
            Settings
          </p>
        }
        value={"settings"}
        icon={<img src={settingsIcon} />}
      />
    </StyledTabs>
  );
};

export default Tabs2;
