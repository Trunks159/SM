import React from "react";
import ProfileTag from "./profiletag/ProfileTag";
import "./scheduled.css";

const Scheduled = ({ workblocks, removeFromSchedule, dayId, handleSlider }) => (
  <div className="scheduled">
    {workblocks.map((workblock, index) => (
      <ProfileTag
        key={index}
        {...workblock}
        removeFromSchedule={removeFromSchedule}
        handleSlider={handleSlider}
      />
    ))}
  </div>
);
export default Scheduled;
