import React from "react";
import openIcon from "./assets/Open Icon.svg";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import deleteIcon from "./assets/Delete Icon.svg";
function DogTag({ firstName, lastName, position, id, removing, setRemoving }) {
  return (
    <div style={{ position: "relative" }}>
      {removing && (
        <Button
          style={{
            position: "absolute",
            right: 5,
            left: 5,
            top: 0,
            bottom: 0,
            background: "rgba(255, 0,0,.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
          onClick={() =>
            setRemoving({
              teamMember: { firstName, lastName, position, id },
              on: true,
            })
          }
        >
          <img style={{ marginLeft: "auto" }} src={deleteIcon} />
        </Button>
      )}

      <Link to={`/team/profile/${id}`} className="team-dogtag">
        <div className="icon">
          <h2>{firstName.charAt(0)}</h2>
        </div>

        <p>
          {firstName} {lastName}
        </p>
        <caption>{position}</caption>
        <img src={openIcon} alt="Open" />
      </Link>
    </div>
  );
}

export default DogTag;
