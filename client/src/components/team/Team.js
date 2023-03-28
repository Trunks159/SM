import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Divider, TextField, Box } from "@mui/material";
import AddTeamMemberModal from "./AddTeamMemberModal";
import DeleteTeamMemberModal from "./DeleteTeamMemberModal";
import { StyledListButton } from "./StyledComponents";
import Profile from "./TeamMemberDetails/Profile";
import TeamBreadCrumbs from "./TeamBreadCrumbs";
import AlphaButton from "./AlphaButton";
import TeamList from "./TeamList";
import searchIcon from "./assets/Search Icon.svg";
import removeIcon from "./assets/Remove Person Icon.svg";
import closeIcon from "./assets/Close Icon.svg";
import "./team.css";

function Team({ teamMembers }) {
  const [state, setState] = useState({
    removing: { on: false, teamMember: null },
    search: null,
    sort: false,
  });
  const { search, removing, sort } = state;
  const currentUser = useSelector((state) => state.currentUser);
  const isManager = currentUser.position === "team leader";

  function handleSearch(e) {
    setState({ ...state, search: e.target.value });
  }

  function handleSort() {
    setState({ ...state, sort: !sort });
  }

  function startRemoving() {
    setRemoving({ on: true, teamMember: null });
  }

  function cancelRemoving() {
    setRemoving({ on: false, teamMember: null });
  }

  function setRemoving(newValue) {
    setState({ ...state, removing: newValue });
  }

  return (
    <div className="team">
      <TeamBreadCrumbs teamMembers={teamMembers} />

      <Switch>
        <Route
          exact
          path="/team"
          render={() => (
            <div
              className={`team-content${
                removing.on ? " team-content-removing" : ""
              }`}
            >
              <h1 className="team-header">Team Members</h1>
              <div className="list-actions">
                <TextField
                  sx={{ marginBottom: 1, width: "150px" }}
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginLeft: "10px",
                        "& img": {
                          width: "18px",
                          opacity: 0.8,
                        },
                      }}
                    >
                      <img src={searchIcon} />
                      <span> Search</span>
                    </Box>
                  }
                  onChange={handleSearch}
                  type="search"
                  variant="filled"
                />
                <AlphaButton active={sort} handleSort={handleSort} />

                {isManager && (
                  <>
                    <AddTeamMemberModal teamMembers={teamMembers}>
                      Add Team Member
                    </AddTeamMemberModal>
                    <StyledListButton
                      startIcon={
                        <img src={removing.on ? closeIcon : removeIcon} />
                      }
                      onClick={() =>
                        removing.on ? cancelRemoving() : startRemoving()
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
              <TeamList
                setRemoving={setRemoving}
                removing={removing}
                teamMembers={teamMembers}
                sort={sort}
                search={search}
              />
            </div>
          )}
        />

        <Route
          path="/team/profile/:userId/:tab?"
          render={({ match }) => {
            return (
              <Profile
                user={teamMembers.find(
                  ({ id }) => id === parseInt(match.params.userId)
                )}
              />
            );
          }}
        />
      </Switch>
    </div>
  );
}

export default Team;
