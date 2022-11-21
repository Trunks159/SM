import { Tab, Tabs } from "@mui/material";
import React from "react";
import { StyledTabs } from "./StyledComponents";

function TheTabs() {
  return (
    <div style={{ position: "relative" }}>
      <StyledTabs
        variant={"scrollable"}
        value={0}
        style={{ position: "absolute", left: 0, right: 0, bottom: 0, top: 0 }}
      >
        <Tab value={0} label={"Tab1"} />
        <Tab value={1} label={"Tab2"} />
        <Tab value={2} label={"Tab3"} />
        <Tab value={0} label={"Tab1"} />
        <Tab value={1} label={"Tab2"} />
        <Tab value={2} label={"Tab3"} />
        <Tab value={0} label={"Tab1"} />
        <Tab value={1} label={"Tab2"} />
        <Tab value={2} label={"Tab3"} />
        <Tab value={0} label={"Tab1"} />
        <Tab value={1} label={"Tab2"} />
        <Tab value={2} label={"Tab3"} />
        <Tab value={0} label={"Tab1"} />
        <Tab value={1} label={"Tab2"} />
        <Tab value={2} label={"Tab3"} />
        <Tab value={0} label={"Tab1"} />
        <Tab value={1} label={"Tab2"} />
        <Tab value={2} label={"Tab3"} />
        <Tab value={0} label={"Tab1"} />
        <Tab value={1} label={"Tab2"} />
        <Tab value={2} label={"Tab3"} />
      </StyledTabs>
    </div>
  );
}

export default TheTabs;
