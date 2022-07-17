import { Tab, Tabs } from "@material-ui/core";
import React from "react";
import { styled, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  tab: {
    minWidth: 100,
    background: "orange",
  },
  tabLink: {
    background: "green",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none",
    color: "white",
  },
  tabs: {
    stuff: 1,
    background: "blue",
  },
});

const Yomama = ({ days, currentTab, changeTab, weekId }) => {
  return (
    <Tabs
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      onChange={changeTab}
      value={currentTab}
    >
      {days.map((d, index) => {
        return (
          <Tab
            label={
              <Link to={`/scheduletron/${weekId}/${index}`}>
                {`${index === currentTab ? d.weekday : ""} ${d.month}/${d.day}`}
              </Link>
            }
            value={index}
          />
        );
      })}
    </Tabs>
  );
}

export default Yomama;
