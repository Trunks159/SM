import React, { useState, useEffect } from "react";
import scheduleIcon from "./assets/Schedule Icon.svg";
import openIcon from "./assets/Open Icon.svg";
import { Link, useLocation } from "react-router-dom";
import { StyledTab, StyledTabs } from "./StyledTabs";
import { Tab } from "@material-ui/core";

function Tabs1({ weekId }) {
  const location = useLocation();

  const [value, setValue] = useState(
    location.pathname === "/scheduletron" ? "open" : "schedule"
  );
  const newValue = location.pathname === "/scheduletron" ? "open" : "schedule";

  const handleChange = (e, newVal) => setValue(newVal);

  useEffect(() => {
    if (newValue !== value) {
      setValue(newValue);
    }
  }, [location, value, newValue]);

  return (
    <StyledTabs
      label="Open"
      onChange={handleChange}
      value={value}
      orientation="vertical"
    >
      <StyledTab
        component={Link}
        label="Open"
        to="/scheduletron"
        icon={<img alt="Open" src={openIcon} />}
        value={"open"}
        style={{ minWidth: 0 }}
      />
      <StyledTab
        component={Link}
        label="Schedule"
        style={{ minWidth: 0 }}
        to={
          weekId
            ? `/scheduletron/viewer/${weekId}/${0}`
            : `/scheduletron/viewer`
        }
        value={"schedule"}
        icon={<img alt="Schedule" src={scheduleIcon} />}
      />
    </StyledTabs>
  );
}

export default Tabs1;
