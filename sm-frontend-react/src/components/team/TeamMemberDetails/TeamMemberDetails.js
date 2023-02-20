import { Breadcrumbs, Divider } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./TeamMemberDetails.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { grey } from "@mui/material/colors";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Availability from "./Availability/Availability";
import RequestOffs from "./RequestOffs/RequestOffs";
import Details from "./Details/Details";
import Header from "./Header";

const StyledBreadcrumbs = styled(Breadcrumbs)({
  marginLeft: 90,
  marginTop: "auto",
  marginBottom: "auto",
});

function TeamMemberDetails({ id }) {
  const [breadcrumbs, setBreadCrumbs] = useState([]);
  const [teamMember, setTeamMember] = useState(null);
  const location = useLocation();

  function handleSave(changedProps) {
    if (changedProps) {
      fetch("/update_user", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedProps),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("Maybe It saved");
        });
    }
  }

  useEffect(() => {
    if (teamMember) {
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
            <Link to={to} className={`breadcrumb${isActive ? "-active" : ""}`}>
              {isActive ? teamMember.username || teamMember.firstName : name}
            </Link>
          );
        })
      );
    }
  }, [location, teamMember]);

  useEffect(() => {
    fetch(`/team_member_details/${id}`)
      .then((response) => response.json())
      .then(({ user }) => {
        //this is where i should handle there being no user
        //but im lazy
        setTeamMember(user);
        console.log("Requests: ", user.requestOffs);
      });
  }, []);
  function handleChange(e) {
    setTeamMember({ ...teamMember, [e.target.name]: e.target.value });
  }

  return (
    teamMember && (
      <div className="tm-details">
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
        <div className="main-div">
          <Header
            firstName={teamMember.firstName}
            lastName={teamMember.lastName}
            username={teamMember.username}
          />
          <Details teamMember={teamMember} />
          <Availability
            availability={teamMember.availability}
            handleSave={handleSave}
          />
          <RequestOffs
            requestOffs={teamMember.requestOffs}
            handleSave={handleSave}
          />
        </div>
      </div>
    )
  );
}

export default TeamMemberDetails;
