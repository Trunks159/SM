import React, { useState } from "react";
import SaveButton from "../SaveButton";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
function Details({ user, handleChange, handleSave, isHidden }) {
  const { username, lastName, firstName } = user;
  const currentUser = useSelector((state) => state.currentUser);
  const [originalUser, setOriginalUser] = useState({
    username,
    firstName,
    lastName,
  });
  function hasChanged(props) {
    //returns an object if has changed otherwise false
    if (user && originalUser) {
      let thingsThatHaveChanged = {};
      for (let prop of props) {
        if (user[prop] !== originalUser[prop]) {
          thingsThatHaveChanged[prop] = user[prop];
        }
      }

      return thingsThatHaveChanged === {} ? false : thingsThatHaveChanged;
    }
  }

  return (
    <form className="details" style={{ display: isHidden ? "none" : "flex" }}>
      <div className="details-header">
        <h2 className="title">
          {currentUser.id === user.id ? (
            "My"
          ) : user.username ? (
            user.username
          ) : (
            <span className="name">{user.firstName}</span>
          )}
          's Details
        </h2>
        <p className="help-text">
          You can even change your name here (I mean I don't know why but you
          can...)
        </p>
      </div>

      <ul>
        <TextField
          disabled={!Boolean(username)}
          label="Username"
          variant="outlined"
          value={username || "Hasn't registered yet"}
          onChange={handleChange}
          name="firstName"
        />
        <TextField
          label="First Name"
          variant="outlined"
          value={firstName}
          onChange={handleChange}
          name="firstName"
        />
        <TextField
          label="Last Name"
          variant="outlined"
          value={lastName}
          onChange={handleChange}
          name="lastName"
        />
      </ul>

      <SaveButton
        onClick={() => handleSave()}
        hasChanged={hasChanged(["firstName", "lastName", "username"])}
      >
        Name
      </SaveButton>
    </form>
  );
}

export default Details;
