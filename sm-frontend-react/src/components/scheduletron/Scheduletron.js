import React, { Component , useState, useEffect} from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import SideNav from "./nav/SideNav";
import Home from "./home/Home";
import WeekTabs from "./weektabs/WeekTabs";
import "./scheduletron.css";
import { useSelector, useDispatch } from "react-redux";

//ACTIONS
const updateSelectedWeek = (payload)=>
({
  type : 'UPDATE_SELECTED_WEEK',
  payload
});


const Scheduletron = ({notifyUser})=>{
  const location = useLocation();
  const qParams = new URLSearchParams(location.search);
  const date = qParams.get("date");
  const selectedWeek = useSelector((state)=>state.selectedWeek);
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(null);
  const [weeks, setWeeks] = useState([]);
  const [screenWidth, setScreenWidth] = useState(0);
  const isDesktop = window.innerWidth > 600;

  updatePredicate = () =>{
    setScreenWidth(window.innerWidth);
  }

  useEffect(()=>{
    window.addEventListener("resize", updatePredicate);
    updatePredicate();
    return(
      window.removeEventListener("resize", updatePredicate)
    )
  }, [])

  fetchWeekSchedule = (date) => {
    fetch(`/get_week_schedule?date=${date}`)
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          dispatch(updateSelectedWeek(response));
          setRedirect(  <Redirect to={`/scheduletron/viewer/${response.id}/${0}`} />)
        } else {
          setRedirect({ redirect: <Redirect to={"/scheduletron"} /> });
        }
      });
  };

  date && fetchWeekSchedule("9-13-2021");
  
  return(
    <div className="scheduletron">
    {redirect}
    <SideNav selectedWeek={selectedWeek} />

    <Switch>
      <Route exact path={"/scheduletron"}>
        <Home
          setSelectedWeek={this.setSelectedWeek}
          selectedWeek={selectedWeek}
          screenWidth={screenWidth}
        />
      </Route>

      <Route
        path={"/scheduletron/viewer/:weekId/:dayIndex"}
        render={({ match }) => {
          return (
            <WeekTabs
              match={match}
              weekId={parseInt(match.params.weekId)}
              setSelectedWeek={this.setSelectedWeek}
              dayIndex={parseInt(match.params.dayIndex)}
              weekSchedule={selectedWeek}
            />
          );
        }}
      />
    </Switch>
  </div>
  )
}

export default Scheduletron;
