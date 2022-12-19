import React from "react";
import { Link } from "react-router-dom";
import { Header, SolidButton } from "../forms/StyledComponents";
import "./team.css";
import DogTag from "./TeamMemberDogtag";

function Team({ teamMembers }) {
  return (
    <div className="team-main-container">
      <Header>Team Members</Header>
      {teamMembers.map((member, index) => (
        <DogTag key={index} {...member} />
      ))}
      <SolidButton component={Link} to={"/team/add"}>
        Add TeamMember
      </SolidButton>
    </div>
  );
}

export default Team;
