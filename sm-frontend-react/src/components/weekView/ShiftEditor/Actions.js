import React, { Component } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import expandIcon from "../../../assets/images/White Expand Icon.svg";
import addIcon from "../../../assets/images/Add Workers Icon.svg";
import submitIcon from "../../../assets/images/Submit Icon.svg";
import dayIcon from "../../../assets/images/Day Icon.svg";
import nightIcon from "../../../assets/images/Night Icon.svg";
import settingsIcon from "../../../assets/images/Settings Icon.svg";
import ActionBtn from "./ActionBtn";

class Actions extends Component {
  state = {};
  render() {
    const {handleAdd, handleSubmit} = this.props;
    return (
      <Accordion
        disableGutters
        sx={{
          background: "rgba(151, 151,151, .78)",
          width: 65,
          position: "absolute",
          right: 0,
          top: 0,
        }}
      >
        <AccordionSummary
          sx={{ flexDirection: "column" }}
          expandIcon={
            <img
              style={{ transform: "rotate(90deg)", marginBottom: 10 }}
              src={expandIcon}
            />
          }
        >
          <ActionBtn iconPath={addIcon} label={"Add"} color = {'#54F2D1'} handleAdd = {handleAdd}/>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap : '10px',
          }}
        >

          <ActionBtn iconPath={submitIcon} label={"Submit"} color = {'#FFB932'} handleSubmit = {handleSubmit}/>
          <ActionBtn iconPath={dayIcon} label={"Day"} color = {'#00A870'} imgStyle = {{marginTop : 4}} />
          <ActionBtn iconPath={nightIcon} label={"Night"} color = {'#737F7B'} imgStyle = {{transform :'rotate(-45deg)', marginTop : 5,}}/>
          <ActionBtn iconPath={settingsIcon} label={"Settings"} color = {'#328F83'}/>
        </AccordionDetails>
      </Accordion>
    );
  }
}

export default Actions;
