import React, { useState, useEffect } from "react";
import scheduleIcon from "./assets/Schedule Icon.svg";
import openIcon from "./assets/Open Icon.svg";
import { Link, NavLink, useLocation } from "react-router-dom";
import {  StyledTab } from "./StyledTabs";
import { styled, Tab, Tabs } from "@material-ui/core";

//So everything is based on location i guess
//If we're at scheduletron it

const LinkTab = (props) => (
  <Tab
    component="a"
    onClick={(e) => {
      e.preventDefault();
    }}
    {...props}
  />
);

const StyledTabs = styled(Tabs)({
  "& .MuiTabs-indicator": {
    background: "white",
    left: 0,
  },
  width: "100%",
  marginTop: "auto",
});

function Tabs1({ weekId }) {
  const location = useLocation();
  console.log("Locate me: ", location);
  const [value, setValue] = useState(
    location.pathname === "/scheduletron" ? "open" : "schedule"
  );
  const handleChange = (e, newVal) => setValue(newVal);

/*     weekId
? `/scheduletron/viewer/${weekId}/${0}`
: `/scheduletron/?date=${"9-13-2021"}`*/

  return (
    <StyledTabs
      label="Open"
      onChange={handleChange}
      value={value}
      orientation="vertical"
      style={{ background: "red", flex: 1, width: "100%" }}

    >
      <Tab
        component={Link}
        label="Open"
        to="/scheduletron"
        icon={<img src={openIcon} />}
        value = {'open'}
        style={{minWidth  :0}}
      />
      <Tab
        component={Link}
        label="Schedule"
        style={{minWidth  :0}}
        to={
          weekId
            ? `/scheduletron/viewer/${weekId}/${0}`
            : `/scheduletron/?date=${"9-13-2021"}`
        }
        value = {
    'schedule'
        }
        icon={<img src={scheduleIcon} />}
      />
    </StyledTabs>
  );
}

export default Tabs1;
