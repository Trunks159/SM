import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import { Header, SolidButton } from "../forms/StyledComponents";
import "./team.css";
import DogTag from "./TeamMemberDogtag";
import AddTeamMember from "../forms/AddTeamMember/AddTeamMember";

function Team({ fetchUsers, teamMembers, notifyUser }) {
  useEffect(() => {
    fetchUsers();
  }, []);

  const currentUser = useSelector((state) => state.currentUser);
  return (
    <Switch>
      <Route exact path={"/team"}>
        <div className="team-main-container">
          <Header>Team Members</Header>
          {teamMembers.map((member, index) => (
            <DogTag key={index} {...member} />
          ))}
          <SolidButton component={Link} to={"/team/add_team_member"}>
            Add TeamMember
          </SolidButton>
        </div>
      </Route>
      <Route
        path="/team/add_team_member"
        render={() => {
          if (currentUser.username && currentUser.position < 1) {
            //this is where i would send the error message through the url
            //and redirect to the last page but idk how really
            return <Redirect to="/team" />;
          }
          return (
            <AddTeamMember teamMembers={teamMembers} notifyUser={notifyUser} />
          );
        }}
      />
    </Switch>
  );
}

export default Team;
