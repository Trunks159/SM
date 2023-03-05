import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Switch, Route, Redirect, useLocation } from "react-router-dom";
import { Header, SolidButton } from "../../forms/StyledComponents";
import "./team.css";
import DogTag from "../TeamMemberDogtag";
import AddTeamMember from "../../forms/AddTeamMember/AddTeamMember";
import TeamMemberDetails from "../TeamMemberDetails/TeamMemberDetails";

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
          <ul>
            {teamMembers.map((member, index) => (
              <li key={member.id}>
                <DogTag
                  firstName={member.firstName}
                  lastName={member.lastName}
                  id={member.id}
                />
              </li>
            ))}
          </ul>

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
      <Route
        path="/team/profile/:id"
        render={(props) => {
          return <TeamMemberDetails id={props.match.params.id} />;
        }}
      />
    </Switch>
  );
}

export default Team;
