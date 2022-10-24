import React, { useState, useEffect } from "react";
import scheduleIcon from "./assets/Schedule Icon.svg";
import openIcon from "./assets/Open Icon.svg";
import { NavLink, useLocation } from "react-router-dom";
import { StyledTabs, StyledTab } from "./StyledTabs";
//So everything is based on location i guess
//If we're at scheduletron it

function Tabs1({ weekId }) {
  const location = useLocation();
  console.log("Locate me: ", location);
  const [value, setValue] = useState(
    location.pathname === "/scheduletron" ? "open" : "schedule"
  );
  const handleChange = (e, newVal) => setValue(newVal);

  return (
    <StyledTabs onChange={handleChange} value={value} orientation="vertical">
      <NavLink to="/scheduletron">
        <StyledTab
          label="Open"
          value="open"
          currentMenu={value}
          icon={<img src={openIcon} />}
        />
      </NavLink>
      <NavLink
        to={
          weekId
            ? `/scheduletron/viewer/${weekId}/${0}`
            : `/scheduletron/?date=${"9-13-2021"}`
        }
      >
        <StyledTab
          label="Schedule"
          value="schedule"
          currentMenu={value}
          icon={<img src={scheduleIcon} />}
        />
      </NavLink>
    </StyledTabs>
  );
}

export default Tabs1;
