import { Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import teamIcon from "./assets/Team Icon.svg";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { grey } from "@mui/material/colors";

function TeamBreadCrumbs({ teamMembers }) {
  const [breadcrumbs, setBreadCrumbs] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const pathnames = location.pathname
      .split("/")
      .filter((x) => x !== "profile" && x !== "");
    setBreadCrumbs(
      pathnames.map((name, index) => {
        //to = one before + current
        const splitted = location.pathname.split("/");
        const i = splitted.indexOf(name);
        const to = splitted.slice(0, i + 1).join("/");
        const isActive = index === pathnames.length - 1;

        return (
          <Link
            key={index}
            to={to}
            className={`breadcrumb${isActive ? " breadcrumb-active" : ""}`}
          >
            {/*Converts the id part to a username or firstname */}
            {name === "team" && (
              <img alt="team" className="main-icon" src={teamIcon} />
            )}

            {((name) => {
              const possibleId = Number.isInteger(parseInt(name));

              if (possibleId) {
                const t = teamMembers.find(({ id }) => id === parseInt(name));
                return t.username ? t.username : t.firstName;
              }
              return name;
            })(name)}
          </Link>
        );
      })
    );
  }, [location]);
  return (
    <Breadcrumbs
      sx={{
        "& ol": {
          rowGap: 5,
        },
        gridArea: "breadcrumbs",
      }}
      separator={
        <NavigateNextIcon
          style={{ color: grey[900], opacity: 0.57 }}
          fontSize="small"
        />
      }
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}

export default TeamBreadCrumbs;
