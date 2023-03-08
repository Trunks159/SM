import { Modal, Paper, Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import closeIcon from "./assets/Close Icon.svg";
import DogTag from "./TeamMemberDogtag";

function updateAlert(newAlert) {
  return {
    type: "UPDATE_ALERT",
    payLoad: newAlert,
  };
}

function deleteUser(id) {
  return {
    type: "DELETE_USER",
    payLoad: id,
  };
}

function DeleteTeamMemberModal({ teamMember, children, cancelRemoving }) {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    //take that user and send it to backend, if successful, delete user in redux
    const { firstName, lastName, id, position } = teamMember;
    fetch(`/api/remove_team_member?user-id=${id}`, {
      method: "PUT",
    })
      .then((response) => response.json())
      .then(({ wasSuccessful, message }) => {
        if (wasSuccessful) {
          dispatch(
            updateAlert({
              content: `${firstName} ${lastName} has been successfully deleted.`,
              title: "Removal Successful",
              severity: "success",
            })
          );
          dispatch(deleteUser(id));
        } else {
          dispatch(
            updateAlert({
              content: message,
              title: "Removal Unsuccessful",
              severity: "error",
            })
          );
        }
      });
  }

  return (
    <Modal
      style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClose={cancelRemoving}
      open={teamMember}
    >
      <Paper style={{ maxWidth: "90%", height: 600, margin: 30 }}>
        <form className="add-tm-form" onSubmit={handleSubmit}>
          <h1>Are you sure?</h1>
          <Button
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: 15,
              opacity: 0.8,
            }}
            onClick={cancelRemoving}
          >
            <img src={closeIcon} />
          </Button>

          <p>Deleting a team member is permenent.</p>
          {teamMember && (
            <DogTag
              firstName={teamMember.firstName}
              lastName={teamMember.lastName}
              position={teamMember.position}
            />
          )}

          <Button onClick={handleSubmit}>DELETE</Button>

          <Button onClick={cancelRemoving}>Cancel</Button>
        </form>
      </Paper>
    </Modal>
  );
}

export default DeleteTeamMemberModal;
