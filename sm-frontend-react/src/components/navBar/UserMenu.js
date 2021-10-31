import React from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { makeStyles} from '@material-ui/styles';
import { Link } from 'react-router-dom';
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
const useStyles = makeStyles({
    mainDiv :{
        marginLeft :'auto',
        marginRight:10,
        background: 'white',
        borderRadius : 7,
        boxShadow : '5px 5px 15px 5px rgba(0,0,0,0.25)'
    },
    dashboard :{
        textTransform : 'none',
        color : 'black',
    },
    circleIcon: {
        marginRight: "6px",
        marginLeft: "6px",
      },
});

const UserMenu = ({username, logoutUser}) =>  {
    const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () =>{
      handleClose();
      logoutUser();

  }

  return (
    <div className = {classes.mainDiv}>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className = {classes.dashboard}
      >
                        <AccountCircleIcon
                style={{ fill: "black" }}
                className={classes.circleIcon}
              />
       {username}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Link to={`/user/${username}`}><MenuItem onClick={handleClose}>Profile</MenuItem></Link>
        <Link to={`/user/${username}/availability`} ><MenuItem onClick={handleClose}>My Availability</MenuItem></Link>
        <Button><MenuItem onClick={()=>handleLogout()}>Logout</MenuItem></Button>
      </Menu>
    </div>
  );
}

export default UserMenu;