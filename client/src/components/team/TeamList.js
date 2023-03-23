import React from "react";
import { Divider } from "@mui/material";
import DogTag from "./TeamMemberDogtag";

function TeamList({ teamMembers, sort, search, setRemoving, removing }) {
  const users = [...teamMembers];
  if (sort) {
    users.sort((a, b) => {
      if (a.firstName < b.firstName) {
        return -1;
      }
      if (a.firstName > b.firstName) {
        return 1;
      }
      return 0;
    });
  }
  return (
    <ul>
      {users
        .filter((user) =>
          search
            ? [user.firstName, user.lastName]
                .join(" ")
                .startsWith(search.toLowerCase())
            : user
        )
        .map(({ firstName, lastName, position, id }) => (
          <li>
            <DogTag
              firstName={firstName}
              lastName={lastName}
              position={position}
              id={id}
              removing={removing.on}
              setRemoving={setRemoving}
            />
            <Divider sx={{ background: "#F5F5F5", margin: "10px 0px" }} />
          </li>
        ))}
    </ul>
  );
}

export default TeamList;
