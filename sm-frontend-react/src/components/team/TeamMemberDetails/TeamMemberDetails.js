import { Breadcrumbs } from "@mui/material";
import React, { useState, useEffect } from "react";
function TeamMemberDetails({ id }) {
  const [breadcrumbs, setBreadCrumbs] = useState([]);
  const [teamMember, setTeamMember] = useState(null);
  useEffect(() => {
    fetch(`/team_member_details/${id}`)
      .then((response) => response.json())
      .then(({ wasSuccessful, message, user }) => {
        setTeamMember(user);
      });
  });

  return (
    <div>
        Im making moves
      <Breadcrumbs>{breadcrumbs}</Breadcrumbs>
      <h1>{teamMember.firstName}</h1>
    </div>
  );
}

export default TeamMemberDetails;
