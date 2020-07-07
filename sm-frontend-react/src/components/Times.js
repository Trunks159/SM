import React from "react";

const Times = () => (
  <div className="float-child1">
    <ul className="list">
      {[
        "7:00AM",
        "8:00AM",
        "9:00AM",
        "10:00AM",
        "11:00AM",
        "12:00PM",
        "1:00PM",
        "2:00PM",
        "3:00PM",
        "4:00PM",
        "5:00PM",
        "6:00PM",
        "7:00PM",
        "8:00PM",
        "9:00PM",
        "10:00PM",
        "11:00PM",
      ]
        .slice(0)
        .reverse()
        .map((x) => (
          <li className="item">{x}</li>
        ))}
    </ul>
  </div>
);

export default Times;
