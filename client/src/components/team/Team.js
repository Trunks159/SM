import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import teamIcon from "./assets/Team Icon.svg";
import searchIcon from "./assets/Search Icon.svg";
import sortIcon from "./assets/Sort Icon.svg";
import filterIcon from "./assets/Filter Icon.svg";
import { Divider, TextField } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { grey } from "@mui/material/colors";
import "./team.css";
import DogTag from "./TeamMemberDogtag";
import AddTeamMemberModal from "./AddTeamMemberModal";
import DeleteTeamMemberModal from "./DeleteTeamMemberModal";
import removeIcon from "./assets/Remove Person Icon.svg";
import closeIcon from "./assets/Close Icon.svg";
import {
  StyledListButton,
  StyledBreadcrumbs,
  StyledAdvancedButton,
} from "./StyledComponents";

function Team({ teamMembers }) {
  const [breadcrumbs, setBreadCrumbs] = useState([]);
  const [removing, setRemoving] = useState({ on: false, teamMember: null });
  const location = useLocation();
  const currentUser = useSelector((state) => state.currentUser);
  const isManager = currentUser.position > 0;

  function cancelRemoving() {
    setRemoving({ on: false, teamMember: null });
  }
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
      <h1 className="team-header">Team Members</h1>

      <div
        className={`team-content${removing.on ? " team-content-removing" : ""}`}
      >
        <div className="list-actions">
          <div>
            <TextField
              sx={{ marginBottom: 1, width: "150px" }}
              label={
                <div className="search-label">
                  <img src={searchIcon} />
                  Search
                </div>
              }
              type="search"
              variant="filled"
            />
          </div>
          <div className="list-actions-advanced">
            <StyledAdvancedButton endIcon={<img src={sortIcon} />}>
              Sort
            </StyledAdvancedButton>
            <StyledAdvancedButton endIcon={<img src={filterIcon} />}>
              Filter
            </StyledAdvancedButton>
          </div>
          {isManager && (
            <>
              <AddTeamMemberModal teamMembers={teamMembers}>
                Add Team Member
              </AddTeamMemberModal>
              <StyledListButton
                startIcon={<img src={removing.on ? closeIcon : removeIcon} />}
                onClick={() =>
                  removing.on
                    ? cancelRemoving()
                    : setRemoving({ on: true, teamMember: null })
                }
                removing={removing.on}
              >
                <span className="button-text">
                  {removing.on ? "Cancel Deletion" : "Remove Team Member"}
                </span>
              </StyledListButton>

              <DeleteTeamMemberModal
                cancelRemoving={cancelRemoving}
                teamMember={removing.teamMember}
              />
            </>
          )}
        </div>
        <Divider sx={{ background: "#E4E4E4" }} />
        <ul>
          {teamMembers.map(({ firstName, lastName, position, id }) => (
            <li>
              <DogTag
                firstName={firstName}
                lastName={lastName}
                position={
                  parseInt(position) === 1 ? "Team Leader" : "Team Member"
                }
                id={id}
                removing={removing.on}
                setRemoving={setRemoving}
              />
              <Divider sx={{ background: "#F5F5F5", margin: "10px 0px" }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Team;
