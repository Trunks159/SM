import React from "react";
import { Menu, MenuItem, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";
import userIcon from "../../assets/images/User Icon.svg";

const useStyles = makeStyles({
  mainDiv: {
    borderRadius: 7,

  },
  dashboard: {
    textTransform: "none",
    color: "black",
    "& div": {
      display: "flex",
      flexDirection: "column",
      alignItems: 'center',
      fontSize :'12px',
      '& p':{
        margin :3,
      },
      '& img':{
        width : 44,
      },
    },
  },
  circleIcon: {
    marginRight: "6px",
    marginLeft: "6px",
  },
});

const UserMenu = ({ username, logoutUser }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    logoutUser();
  };

  return (
    <div className={classes.mainDiv}>
      <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={classes.dashboard}
      >
        <div>
          <p>{username}</p>
          <img src={userIcon} />
        </div>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Link to={`/user/${username}`}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link to={`/user/${username}/availability`}>
          <MenuItem onClick={handleClose}>My Availability</MenuItem>
        </Link>
        <Button>
          <MenuItem onClick={() => handleLogout()}>Logout</MenuItem>
        </Button>
      </Menu>
    </div>
  );
};

export default UserMenu;
