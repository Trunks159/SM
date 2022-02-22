import React, { Component } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Button } from "@material-ui/core";
import expandIcon from "../../../assets/images/White Expand Icon.svg";
import addIcon from "../../../assets/images/Add Workers Icon.svg";
import submitIcon from "../../../assets/images/Submit Icon.svg";
import dayIcon from "../../../assets/images/Day Icon.svg";
import nightIcon from "../../../assets/images/Night Icon.svg";
import ActionBtn from "./ActionBtn";

class Actions extends Component {
  state = {};
  render() {
    return (
      <Accordion disableGutters sx={{ background: "rgba(151, 151,151, .78)", width: 90 , position : "absolute", right : 0, top :0,}}>
        <AccordionSummary sx = {{flexDirection : 'column'}} expandIcon={<img style = {{transform : 'rotate(90deg)', marginBottom : 10}} src={expandIcon} />}>
          <ActionBtn iconPath={addIcon} label = {'Add'}/>
          
        </AccordionSummary>
        <AccordionDetails sx={{alignItems : 'center', display : 'flex', flexDirection : 'column'}}>
        <ActionBtn iconPath={submitIcon} label = {'Submit'}/>
        <ActionBtn iconPath={dayIcon} label = {'Day'}/>
        <ActionBtn iconPath={nightIcon} label = {'Night'}/>
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default Actions;
