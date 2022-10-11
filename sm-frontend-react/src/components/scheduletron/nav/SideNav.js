import React, { Component, useState } from "react";
import Tabs1 from "./Tabs1";
import Tabs2 from "./Tabs2";
import "./nav.css";
import NavMenu from "./navmenu/NavMenu";
import { useSelector } from "react-redux";

function SideNav(){

  const [menu, setMenu] = useState(null);
  const selectedWeek = useSelector(state => state.selectedWeek)

  function changeMenu(e, newValue) {
    setMenu( menu === newValue ? null : newValue );
  };

  return(
    <>
    <div className="placeholder-nav"></div>
    <div className="side-navbar">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 70,
          background: "#51636D",
        }}
      >
        <Tabs1 dayIndex={0} weekId={selectedWeek && selectedWeek.id} />
        <Tabs2
          changeMenu={changeMenu}
          selectedWeek={selectedWeek}
          menu={menu}
        />
      </div>
      <NavMenu
        selectedWeek={selectedWeek}
        menu={menu}
        changeMenu={changeMenu}
      />
    </div>
  </>
  )
}



export default SideNav;
