import React, { useEffect, useState } from "react";
import { useLocation, Link, NavLink } from "react-router-dom";
import styled from "@emotion/styled";
import teamIcon from "./assets/Team Icon.svg";
import { Breadcrumbs, Tab, Tabs, TextField } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { grey } from "@mui/material/colors";
import "./team.css";

import AddTm from "./AddTm";

const StyledBreadcrumbs = styled(Breadcrumbs)({
  marginLeft: 90,
  marginTop: "auto",
  marginBottom: "auto",
  "& ol": {
    rowGap: 5,
  },
  gridArea: "breadcrumbs",
});

const StyledTabs = styled(Tabs)({
  alignItems: "center",
  "& .MuiTabs-flexContainer": {
    alignItems: "center",
  },
  "& .MuiTabs-indicator": {
    background: "white",
  },
});

const StyledTab = styled(Tab)({
  textTransform: "none",
  color: "white",
  fontSize: 11,
  opacity: 0.7,
  "&.Mui-selected": {
    opacity: 1,
    color: "white",
  },
});

function Team({ endpoint, teamMembers, notifyUser }) {
  const [breadcrumbs, setBreadCrumbs] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    setBreadCrumbs(
      pathnames.map((name, index) => {
        const to = (() => {
          const pathnamesSlice = pathnames.slice(0, index + 1);
          let to = "";
          for (let pathname of pathnamesSlice) {
            to += `${index === 0 ? "" : "/"}${pathname}`;
          }
          return to;
        })();
        const isActive = index === pathnames.length - 1;
        return (
          <Link
            to={to}
            className={`breadcrumb${isActive ? " breadcrumb-active" : ""}`}
          >
            {/*Converts the id part to a username or firstname */}
            {name === "team" && (
              <img alt="team" className="main-icon" src={teamIcon} />
            )}
            {name}
            {/*Number.isInteger(parseInt(name))
                ? teamMember.username || teamMember.firstName
          : name*/}
          </Link>
        );
      })
    );
  }, [location]);

  const currentTab = ((endpoint) => {
    if (endpoint) {
      return { remove: 2, add: 1 }[endpoint];
    }
    return 0;
  })(endpoint);
  return (
    <div className="team">
      <StyledBreadcrumbs
        separator={
          <NavigateNextIcon
            style={{ color: grey[900], opacity: 0.57 }}
            fontSize="small"
          />
        }
      >
        {breadcrumbs}
      </StyledBreadcrumbs>
      <div className="team-content">
        <AddTm teamMembers={teamMembers} notifyUser={notifyUser} />
      </div>
      {/* <div className="ice">
        <StyledTabs value={currentTab} orientation="vertical">
          <StyledTab
            value={0}
            component={Link}
            to={"/team"}
            label={"Team"}
            icon={<img alt="List" src={listIcon} />}
          />
          <StyledTab
            icon={<img alt="Add" src={addIcon} />}
            value={1}
            component={Link}
            to={"/team/add"}
            label={"Add TM"}
          />
          <StyledTab
            value={2}
            component={Link}
            to={"/team/remove"}
            label={"Remove TM"}
            icon={<img alt="Remove" src={removeIcon} />}
          />
        </StyledTabs>
      </div> */}
    </div>
  );
}

export default Team;
