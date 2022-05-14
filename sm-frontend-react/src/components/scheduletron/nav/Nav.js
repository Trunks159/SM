import React, { Component } from "react";
import Tabs1 from "./Tabs1";
import Tabs2 from "./Tabs2";

class Nav extends Component {
  render() {
    const { path, dayId } = this.props;

    return (
      <div
        style={{
          background: "#51636D",
          position: "fixed",
          height: "100%",
          width: 100,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs1 path={path} dayId={dayId} />
        <Tabs2 path={path} dayId={dayId} />
      </div>
    );
  }
}

/*
const Nav = ({ path, dayId }) => {
  const classes = useStyles();
  return (
    <CustomTabs />
    <div
      style={{
        background: "#51636D",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 63,
      }}
    >
      <IconLink
        img={homeIcon}
        label={path === "/scheduletron" ? "Home" : null}
        to={path}
      />
      <IconLink
        img={scheduleIcon}
        label={path !== "/scheduletron" ? "Schedule" : null}
        to={path + `/${dayId}`}
      />
      <IconLink
        img={searchIcon}
        label={path !== "/scheduletron" ? "Schedule" : null}
        to={path + `/${dayId}`}
      />
      <Button
        classes={{ label: classes.label, root: classes.settings }}
        startIcon={
          <img
            alt=""
            style={{ marginLeft: 10, marginBottom: 5 }}
            src={settingsIcon}
          />
        }
      ></Button>
    </div>
  );
};
*/

export default Nav;
