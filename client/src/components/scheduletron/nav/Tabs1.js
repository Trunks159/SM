import React, { useState, useEffect } from "react";
import scheduleIcon from "./assets/Schedule Icon.svg";
import openIcon from "./assets/Open Icon.svg";
import { Link, useLocation } from "react-router-dom";
import { StyledTab, StyledTabs } from "./StyledTabs";

function Tabs1({ weekId }) {
  const location = useLocation();
  const [value, setValue] = useState(
    location.pathname.split("/").join("") === "scheduletron"
      ? "open"
      : "schedule"
  );

  const handleChange = (e, newVal) => setValue(newVal);

  useEffect(() => {
    const newValue =
      location.pathname.split("/").join("") === "scheduletron"
        ? "open"
        : "schedule";
    if (newValue !== value) {
      setValue(newValue);
    }
  }, [location, value]);

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
      />
      <StyledTab
        component={Link}
        label="Schedule"
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
