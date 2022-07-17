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
    background  : 'blue'
  },
});

function MyTabs({ days, changeTab, currentTab, weekId }) {
  const classes = useStyles();
  return (
    <Tabs
      variant="scrollable"
      scrollButtons
      allowScrollButtonsMobile
      onChange={changeTab}
      value={currentTab}
    >
      {days.map(({ weekday, month, day, index }) => (
        <Tab
        key = {index}
          value={index}
          label={
            <Link
              to={`/scheduletron/${weekId}/${index}`}
            >{`${currentTab === index ? weekday : ""} ${month}/${day}`}</Link>
          }
        />
      ))}
    </Tabs>
  );
}

export default MyTabs;
