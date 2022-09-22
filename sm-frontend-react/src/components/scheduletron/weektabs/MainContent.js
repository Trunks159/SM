import React, { useState, useEffect } from "react";
import Vizualizer from "./visualizer/Visualizer";
import "./maincontent.css";
import Functions from "./functions/Functions";
import TheDrawer from "./drawer/TheDrawer";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const MainContent = ({ day, isDesktop }) => {
  const [redirect, setRedirect] = useState(null);
  const [currentFunction, setCurrentFunction] = useState(null);

  const allUsers = useSelector((state) => state.allUsers);
  const scheduled = useSelector((state) => state.scheduled);
  const notScheduled = useSelector((state) => state.notScheduled);

  const dispatch = useDispatch();

  const setUpState = () => {
    fetch(`/get_schedule/${day.id}`)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          const { allUsers, scheduled, notScheduled } = res;
          this.setState({
            allUsers: allUsers,
            scheduled: scheduled,
            notScheduled: notScheduled,
          });
        } else {
          setRedirect(true);
        }
      });
  };

  useEffect(() => {
    console.log('Hey guys')
    setUpState();
  }, [day]);
  return (
    allUsers && (
      <div className="tab-maincontent">
        {redirect && <Redirect to={"/scheduletron"} />}
       {/*     <Vizualizer day={day} workblocks={scheduled} isDesktop={isDesktop} />
        <Functions
          changeCurrentFunction={setCurrentFunction}
          currentFunction={currentFunction}
          isStatic
        />
        <TheDrawer
          date={day.date}
          teamMembers={notScheduled}
          changeCurrentFunction={setCurrentFunction}
          currentFunction={currentFunction}
        /> */}
   
      </div>
    )
  );
};

/*
  removeFromSchedule = (userId) => {
    let { notScheduled, scheduled } = this.state;
    notScheduled.push(
      scheduled.splice(
        scheduled.indexOf(scheduled.find((wb) => wb.user.id === userId)),
        1
      )[0].user
    );
    this.setState({ notScheduled: notScheduled, scheduled: scheduled });
  };

  addToSchedule = (userId) => {
    let { notScheduled, scheduled } = this.state;
    const { day } = this.props;
    const user = notScheduled.splice(
      notScheduled.indexOf(notScheduled.find((person) => person.id === userId)),
      1
    )[0];

    scheduled.push({
      user: user,
      startTime: moment(day.date).set("hour", 8),
      endTime: moment(day.date).set("hour", 16),
      userId: user.id,
      dayId: day.id,
    });
    this.setState({ notScheduled: notScheduled, scheduled: scheduled });
  };
*/

export default MainContent;
