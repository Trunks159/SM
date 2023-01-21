import React from "react";
import { useDispatch, useSelector } from "react-redux";
import addIcon from "./assets/Add Icon.svg";
import minusIcon from "./assets/Minus Icon.svg";
import { Button } from "@material-ui/core";
import "./TeamPrompt.css";

function TeamPrompt({ currentFunction, name }) {
  const currentSchedule = useSelector((state) => state.currentSchedule);
  const { timeslots, notScheduled } = currentSchedule;
  return (
    <div
      className="prompt team-prompt"
      style={{ display: currentFunction === name ? "flex" : "none" }}
    >
      <h1>Here's Your Squad</h1>
      <h4>Select a team member's name to view their profile info</h4>
      <h2>Not Scheduled</h2>
      <ul>
        {notScheduled.map(({ id, firstName, lastName }) => (
          <li key={id}>
            <Button>
              {firstName} {lastName}
            </Button>
            <Button endIcon={<img alt="add" src={addIcon} />}>SCHEDULE</Button>
          </li>
        ))}
      </ul>
      <ul>
        {timeslots.map(({ user }) => (
          <li key={user.id}>
            <Button>
              {user.firstName} {user.lastName}
            </Button>
            <Button endIcon={<img alt="minus" src={minusIcon} />}>
              UNSCHEDULE
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamPrompt;
