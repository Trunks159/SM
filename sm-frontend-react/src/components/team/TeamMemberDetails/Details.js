import React, { useState } from "react";
import SaveButton from "./SaveButton";
import { MyInput } from "../../forms/StyledComponents";

function Details({ teamMember, handleChange, handleSave }) {
  const { username, lastName, firstName } = teamMember;
  const [originalTeamMember, setOriginalTeamMember] = useState({
    username,
    firstName,
    lastName,
  });
  function hasChanged(props) {
    //returns an object if has changed otherwise false
    if (teamMember && originalTeamMember) {
      let thingsThatHaveChanged = {};
      for (let prop of props) {
        if (teamMember[prop] !== originalTeamMember[prop]) {
          thingsThatHaveChanged[prop] = teamMember[prop];
        }
      }

      return thingsThatHaveChanged === {} ? false : thingsThatHaveChanged;
    }
  }

  return (
    <div>
      <MyInput
        disabled={!Boolean(username)}
        label="Username"
        variant="outlined"
        value={username || "Hasn't registered"}
        onChange={handleChange}
        name="firstName"
      />
      <MyInput
        label="First Name"
        variant="outlined"
        value={firstName}
        onChange={handleChange}
        name="firstName"
      />
      <MyInput
        label="Last Name"
        variant="outlined"
        value={lastName}
        onChange={handleChange}
        name="lastName"
      />
      <SaveButton
        onClick={() => handleSave()}
        hasChanged={hasChanged(["firstName", "lastName", "username"])}
      />
    </div>
  );
}

export default Details;
