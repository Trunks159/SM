import React from "react";
import ProfileTag from "./profiletag/ProfileTag";
import "./scheduled.css";

const Scheduled = ({ workblocks, removeFromSchedule })=>(
<div className="scheduled">
        {workblocks.map((workblock) => (
          <ProfileTag {...workblock} removeFromSchedule = {removeFromSchedule} />
        ))}
      </div>
);

export default Scheduled;