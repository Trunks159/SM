import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { Header, SolidButton } from "../forms/StyledComponents";
import './team.css'

function Team({ teamMembers }) {
  return (
    <div className="team-main-container">
      <Header>Team Members</Header>
      {teamMembers.map(({ firstName, lastName }, index) => (
        <Button key = {index}>
          {firstName} {lastName}
        </Button>
      ))}
      <SolidButton component={Link} to={"/team/add"}>
        Add TeamMember
      </SolidButton>
    </div>
  );
}

export default Team;
