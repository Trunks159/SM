import React, { useState } from "react";
import SaveButton from "../SaveButton";
import { MyInput } from "../../../forms/StyledComponents";
function Details({ teamMember, handleChange, handleSave, isHidden }) {
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
    <form className="details" style={{ display: isHidden ? "none" : "flex" }}>
      <h2 className="header">My Details</h2>
      <p className="help-text">
        You can even change your name here (I mean I don't know why but you
        can...)
      </p>
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
        text={"Name"}
      />
    </form>
  );
}

export default Details;
