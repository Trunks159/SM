import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { Header, SolidButton } from "../forms/StyledComponents";

function Team({ teamMembers }) {
  return (
    <div>
      <Header>Team Members</Header>
      {teamMembers.map(({ firstName, lastName }) => (
        <Button>
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
