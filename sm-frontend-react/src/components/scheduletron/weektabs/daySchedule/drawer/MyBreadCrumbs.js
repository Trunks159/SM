import React, { useState, useEffect } from "react";
import HeaderButton from "./HeaderButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Breadcrumbs } from "@mui/material";
import { grey } from "@mui/material/colors";

function MyBreadcrumbs({ crumbs, updateCrumbs }) {
  //first item is always set to the basic breadcrumb and if second item it adjust styles
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const makeBreadcrumbs = (crumbs) => {
    return crumbs.map((crumb, index) => (
      <HeaderButton
        isActive={index === crumbs.length - 1}
        withIcon={index === 0}
        text={crumb.label}
        updateCrumbs={updateCrumbs}
        index={index}
      />
    ));
  };

  useEffect(() => {
    console.log("Crumb change: ", crumbs);
    if (crumbs.length > 0) {
      //make new reactcomponent breadcrumbs
      setBreadcrumbs(makeBreadcrumbs(crumbs));
    }
  }, [crumbs]);

  console.log("Crumbs: ", crumbs);
  return (
    <Breadcrumbs
      separator={
        <NavigateNextIcon style={{ color: grey[50] }} fontSize="small" />
      }
      style={{
        border: "1px solid rgba(255,255,255, .15)",
        paddingLeft: 30,
      }}
    >
      {breadcrumbs}
    </Breadcrumbs>
  );
}

export default MyBreadcrumbs;
