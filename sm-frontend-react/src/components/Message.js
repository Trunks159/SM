import React from "react";

const Message = ({ type }) => {
  const messages = {
    saved: "Day schedule has been saved!",
    updated: "Day schedule has been updated!",
    deleted: "Day schedule has been deleted.",
  };

  return (
    <div className={`App-message ${type} `}>
      <p className="container">
        <strong>{messages[type]}</strong>
      </p>
    </div>
  );
};

export default Message;
