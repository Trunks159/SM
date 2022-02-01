import { Button, withStyles } from "@material-ui/core";
import React, {Component} from "react";
import whiteProfileIcon from "../../../assets/images/White Profile Icon.svg";

const styles = ()=>({
  button :{

  },
  main : {
    width : 59, 
    height : 59,
    '& img':{
      width : '55%',
      marginTop : 6,
    },
    '& p':{
      margin : 0,
      color : 'white',
      fontSize: 10,
    },
  },
});



class UserThumbnail extends Component {

 
  render() {
    const {classes, name, available, selected, handleBtn} = this.props; 
    const color = available ? (selected ? "#54F2D1" : "#D8F4EE") : "#F0F0F0";
    return available ? (
      <Button  onClick = {handleBtn} style = {{background : color, width : 59, height : 59, minWidth : 20,margin :10}}>
        <div  className = {classes.main} >
          <img src={whiteProfileIcon} />
          <p>{name}</p>
        </div>
      </Button>
    ) : (
      <Button disabled style = {{background : color, width : 59, height : 59, minWidth : 20,margin :10}}>
        <div className = {classes.main}>
          <img src={whiteProfileIcon} />
          <p>{name}</p>
        </div>
      </Button>
    );
  }
}

export default withStyles(styles)(UserThumbnail);



