import React, {Component} from "react";
import { Button, withStyles} from "@material-ui/core";
import UserThumbnail from "./UserThumbnail";
import closeIcon from "../../../assets/images/Close Icon.svg";

const styles = ()=>({
  main: {
    display: "flex",
    flexDirection: "column",
    background: "rgba(50, 143, 131, 0.77)",
    position: "absolute",
    borderRadius: "7px",
    top: 0,
    right: 0,
    height: "100%",
    width: 151,
    "& p": {
      textAlign: "center",
      color: "white",
    },
    minHeight: 100,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    overflowY: "auto",
    gap: "10px",
    alignItems: "center",
    margin: 10,
  },
  addBtn: {
    border: "2px solid #54F2D1",
    color: "#54F2D1",
    borderRadius: "7px",
    textTransform: "none",
    width: "100%",
    height: 73,
    fontSize: 21,
  },
  closeIcon : {
    height : 35,
    width : 35,
    margin : 10,
    marginBottom : 0,
    alignSelf : 'flex-end',
  },
});


class AddWorkers extends Component {
    state = {
      selected : [],
    };

    inSelected = (workerId)=>{
        if(this.state.selected){
            return this.state.selected.find(worker=>workerId === worker.id)
        }
        return false;   
    }

    handleBtn = (id)=>{
      console.log("an id: ", id);
      let selected = this.state.selected;
      let worker = this.inSelected(id);
      if(worker){
        const index = selected.indexOf(worker);
        selected.splice(index, 1);
        this.setState({selectedWorkers : selected});
      }
      else{
        worker = this.props.notScheduled.find((w)=>w.id === id);
        selected.push(worker)
        this.setState({selected : selected})
    }
  }

    render() {
        const { classes, notScheduled, submitWorkers, closeWindow } = this.props;
        return (
            <div className={classes.main}>
              <Button className = {classes.closeIcon} onClick = {closeWindow} endIcon = {<img  src = {closeIcon}  />}></Button>
                
              <div className={classes.column}>
                {notScheduled.map(({firstName, isAvailable, id}) => (
                  <UserThumbnail
                    key = {id}
                    name={firstName}
                    isAvailable={isAvailable}
                    selected={this.inSelected(id)}
                    handleBtn = {()=>this.handleBtn(id)}
                  />
                ))}
              </div>
              <Button  onClick = {() => submitWorkers(this.state.selected)} className={classes.addBtn}>Add Batch</Button>
            </div>
          );
    }
}


export default withStyles(styles)(AddWorkers);
