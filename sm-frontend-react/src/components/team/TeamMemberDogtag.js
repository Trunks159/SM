import React from "react";
import openIcon from "./assets/Open Icon.svg";
import {Button, StepButton} from '@mui/material'
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledButton = styled(Button)({
  '& img':{
    position : 'absolute',
    top : 10,
    right : 10
  },

})

function DogTag({ firstName, lastName, position , id}) {
  return (
    <Link to = {`/team/profile/${id}`} className = 'team-dogtag'>
      <div
        style={{
          width: 45,
          height: 45,
          borderRadius: 22.5,
          background: "#0792B6",
          display : 'flex'
          
        }}
      >
        <h2 style={{ fontSize: 23, margin : 'auto' , color : 'white', fontWeight : 400}}>{firstName.charAt(0)}</h2>
      </div>

      <p>{firstName}</p>
      <p>{lastName}</p>
      <caption>{position}</caption>
      <img src={openIcon} alt="Open" />

 
    </Link>
  );
}

export default DogTag;
