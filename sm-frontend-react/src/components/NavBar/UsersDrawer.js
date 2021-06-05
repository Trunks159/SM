import React from 'react';
import clsx from 'clsx';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import User from '../user/User';
import { Link } from "react-router-dom";
import DehazeIcon from '@material-ui/icons/Dehaze';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  list: {
    width: 250,
    margin: 0,
    background: '#7e266c',
    
  },
  fullList: {
    width: 'auto',
  },
  divider:{
      background:'#CACACA'
  },
  user_button:{
    width:'100%',
    backgroundColor: '#BE35A3',
    textTransform:'none',
    color: 'white',
    '&:hover':{
      background:'#FF4BDB',
    }
  },
  
  user_link:{
    display:'block',
    textDecoration:'none',
    margin:'5px',
  },
});

const useStyles2 = makeStyles((theme) => ({
    users :{
        'margin-left': '10px',
        color: 'white',
    }
  }));

export default function SwipeableTemporaryDrawer({users}) {
  const classes = useStyles();
  const classes2 = useStyles2()
  const [state, setState] = React.useState({
    users: false,
  });


  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

   

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor, users) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        <div className = 'typodiv'><Typography variant = 'h6' className = {classes2.users}>Users</Typography></div>
        <Divider   className = {classes.divider}/>
          {users.map((user)=>(
                <Link className = {classes.user_link} to={`/user/${user.username}`}>
                  <Button
                    variant="contained"
                    className={classes.user_button}
                    startIcon={<AccountCircleIcon style={{fill: "white"}}/>}
                  >
                    {user.first_name}
                  </Button>
                  </Link>
          ))}
          
    </div>
  );
    
  return (
    <div>
      {['users'].map((anchor) => (
        <React.Fragment key={anchor}>
            
          <Button onClick={toggleDrawer(anchor, true)}><DehazeIcon style={{fill: "white"}}/></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            <List className = {classes.list}>{list(anchor, users)}</List>
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}